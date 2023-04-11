import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Form, Input, Select, Space, Tooltip} from 'antd';
import { TestRequest } from '../index';
import './test.scss';
import { sendTestDataProcess} from "../../../../../common/request/sendTestCommon";
import { methodJsonDictionary} from "../../../../../common/dictionary/dictionary";
import {pi} from "../../common/dtAction";
import TestResultCommon from "../../common/TestResultCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import EnvSelect from "../../../../../support/environment/components/EnvSelect";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import GlobalParamModal from "../../../../../support/globalParam/globalParamModal";


const { Option } = Select;

/**
 * 接口测试组件
 */
const ApiTestContent = (props) => {

    const pi = {...pi}

    const {
        getRes,
        apxMethodStore,
        requestHeaderTestStore,
        queryParamTestStore,
        requestBodyTestStore,
        formParamTestStore,
        formUrlencodedTestStore,
        jsonParamTestStore,
        rawParamTestStore,
        preParamTestStore,
        afterParamTestStore,
        assertParamTestStore,
        environmentStore,
        testStore,
        globalHeaderStore
    } = props;

    const {findApxMethod} = apxMethodStore;
    const {testEnvUrl} = environmentStore;
    const { getResponseInfo, getResponseError } = testStore;
    const { requestHeaderList,getRequestHeaderTestList } = requestHeaderTestStore;
    const { querySelectList,getQueryParamTestList } = queryParamTestStore;
    const { bodyTypeInfo,getBodyType,getMediaType } = requestBodyTestStore;
    const { formSelectList,getFormParamTestList } = formParamTestStore;
    const { formUrlSelectList,getFormUrlencodedTestList } = formUrlencodedTestStore;
    const { jsonParamTestList,getJsonParamTestList } = jsonParamTestStore;
    const { rawParamTestInfo,getRawInfo } = rawParamTestStore;
    const { preParamTestInfo,getPreInfo } = preParamTestStore;
    const { afterParamTestInfo,getAfterInfo } = afterParamTestStore;
    const { assertParamTestList } = assertParamTestStore;

    const {globalHeaderList} = globalHeaderStore;

    const [ form ] = Form.useForm();

    const [apiData, setApiData] = useState();
    const [showResponse,setShowResponse]= useState(false);
    const [testResponse, setTestResponse] = useState();
    const [tabTip, setTabTip] = useState();

    const methodId = localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findApxMethod(methodId).then(res=>{
            // debugger
            setApiData(res)
            form.setFieldsValue({
                methodType: res.methodType,
                path: res.path,
            })

            let tabTipObj = {};
            if(res.headerList) {
                tabTipObj.header = true;
                getRequestHeaderTestList(res.headerList);
            }

            if(res.queryList){
                tabTipObj.query = true;
                getQueryParamTestList(res.queryList);
            }

            getBodyType(res.request.bodyType);

            switch (res.request.bodyType){
                case "formdata":
                    if(res.formList) {
                        tabTipObj.body = true;
                        getFormParamTestList(res.formList);
                    }
                    break;
                case "formUrlencoded":
                    if(res.formList){
                        tabTipObj.body = true;
                        getFormUrlencodedTestList(res.urlencodedList);
                    }
                    break;
                case "json":
                    if(res.jsonList){
                        tabTipObj.body = true;
                        getJsonParamTestList(res.jsonList);
                    }
                    break;
                case "raw":
                    if(res.rawParam){
                        tabTipObj.body = true;

                        getRawInfo(res.rawParam);
                        getMediaType(res.rawParam.type);
                    }
                    break;
                case "binary":
                    //问题
                    break;
                default:
                    break;
            }
            getPreInfo(res.request.preScript);
            getAfterInfo(res.request.afterScript);

            setTabTip(tabTipObj)
        })
    },[methodId])


    /**
     * 点击测试
     */
    const onFinish =async ()=> {
        let values =await form.validateFields();

        if(preParamTestInfo.scriptex){
            eval(preParamTestInfo.scriptex)

        }

        const allSendData = {
            "method":values.methodType,
            "baseUrl":values.host?values.host:testEnvUrl,
            "path":values.path,
            "headerList":requestHeaderList,
            "queryList":querySelectList,
            "bodyType":bodyTypeInfo,
            "formDataList":formSelectList,
            "formUrlencoded":formUrlSelectList,
            "jsonList":jsonParamTestList,
            "rawParam":rawParamTestInfo,
        }

        const globalParam = {
            header:globalHeaderList
        }

        //处理后的数据
        const processData = sendTestDataProcess(allSendData,preParamTestInfo,globalParam)

        if(afterParamTestInfo.scriptex){
            eval(afterParamTestInfo.scriptex)
        }

        //发送测试，返回结果
        let response =await getRes(processData)
        if(!!response){
            if(assertParamTestList&&assertParamTestList.length>0){
                response.assertList =[ ...assertParamTestList];
            }

            setTestResponse(response)

            setShowResponse(true)
        }
    }

    /**
     * 测试环境切换
     */
    const showHost = () =>{
        if(testEnvUrl&&testEnvUrl.trim().length!==0){
            return (
                <Tooltip placement="top" title={"请从环境管理修改"}>
                    <div className={"test-host-url"} >
                         {testEnvUrl}
                    </div>
                </Tooltip>
            )
        }else {
            return (
                <Form.Item
                    name="host"
                    className='formItem'
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/),
                            message: '请输入http开头的完整URL'
                        },
                    ]}
                >
                    <Input placeholder={"请输入HTTP开头的完整URL"}  />
                </Form.Item>
            )
        }
    }

    /**
     * 去往接口列表页
     */
    const goToListPage = () =>{
        props.history.push("/workspace/apis/category")
    }

    /**
     * 去往文档页
     */
    const goToDocPage = () =>{
        props.history.push("/workspace/apis/document")
    }

    return(
        <div className={"content-margin"} >
            <div className="content-margin-box">
                <div className={"pi-box-between"}>
                    <Breadcrumb className={"breadcrumb-box"} style={{margin:"0 0 10px 0"}}>
                        <Breadcrumb.Item onClick={goToListPage} className={"first-item"}>接口列表</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={goToDocPage} className={"first-item"}>接口文档</Breadcrumb.Item>
                        <Breadcrumb.Item>接口测试</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{display:"flex",alignItems:"center","justifyContent":"space-between",width: "260px"}}>
                        <GlobalParamModal />
                        <EnvSelect {...props}/>
                    </div>
                </div>


                <div className={"test-base"}>
                    <Form
                        onFinish={onFinish}
                        form = {form}
                        className="test-header"
                    >
                        <div className={"test-url"}>
                            <Form.Item name="methodType" noStyle>
                                <Select style={{width: 100,height:40}} disabled={true} showArrow={false}>
                                    {
                                        Object.keys(methodJsonDictionary).map(item=>{
                                            return <Option value={item}  key={item}>{methodJsonDictionary[item]}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            {
                                showHost()
                            }
                            <Form.Item
                                className='formItem'
                                name="path"
                                rules={[{required: true,message: '接口的路径'}]}
                            >
                                <Input disabled/>
                            </Form.Item>
                        </div>

                        <Space style={{height:40}}>
                            <IconBtn
                                className="important-btn"
                                icon={"fasong-copy"}
                                onClick={onFinish}
                                name={"发送"}
                            />
                            <IconBtn
                                className="pi-icon-btn-grey"
                                name={"退出测试"}
                                onClick={goToDocPage}
                            />
                        </Space>
                    </Form>
                </div>

                <div className='header-title ex-title'>请求</div>
                <div className={"white-bg-box"}>
                    <TestRequest tabTip={tabTip}/>
                </div>

                <div className='header-title ex-title'>响应</div>
                <div className={"white-bg-box"}>
                    <TestResultCommon
                        testResponse={testResponse}
                        showResponse={showResponse}
                    />
                </div>
            </div>
        </div>
    )
}


export default inject(
    'requestHeaderTestStore',
    'queryParamTestStore',
    'requestBodyStore',
    'requestBodyTestStore',
    'formParamTestStore',
    'formUrlencodedTestStore',
    'jsonParamTestStore',
    'rawParamTestStore',
    "preParamTestStore",
    "afterParamTestStore",
    'assertParamTestStore',
    'testStore',
    'testCaseStore',
    "environmentStore",
    "apxMethodStore",
    "globalHeaderStore"
 )(observer(ApiTestContent));


