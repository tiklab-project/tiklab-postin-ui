import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Button, Form, Input, Select, Space, Tooltip} from 'antd';
import { TestRequest } from '../index';
import './test.scss';
import {localDataProcess, mergeTestData} from "../../../../../common/request/sendTestCommon";
import {methodDictionary} from "../../../../../common/dictionary/dictionary";
import {execute} from "../../common/preAfterScript";
import TestResultCommon from "../../common/TestResultCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import apxMethodStore from "../../../definition/store/ApxMethodStore";
import afterParamTestStore from "../store/AfterParamTestStore";
import assertParamTestStore from "../store/AssertParamTestStore";
import formParamTestStore from "../store/FormParamTestStore";
import formUrlencodedTestStore from "../store/FormUrlencodedTestStore";
import preParamTestStore from "../store/PreParamTestStore";
import queryParamTestStore from "../store/QueryParamTestStore";
import rawParamTestStore from "../store/RawParamTestStore";
import requestBodyTestStore from "../store/RequestBodyTestStore";
import requestHeaderTestStore from "../store/RequestHeaderTestStore";
import testStore from "../store/TestStore";
import environmentStore from "../../../../../support/environment/store/environmentStore";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";

const { Option } = Select;
/**
 * 接口测试组件
 */
const ApiTestContent = (props) => {
    const {
        sendTest,
        globalHeaderStore
    } = props;

    const {findApxMethod} = apxMethodStore;
    const {testEnvUrl} = environmentStore;
    const { getJsonParam,jsonData } = testStore;
    const { requestHeaderTestList,getRequestHeaderTestList } = requestHeaderTestStore;
    const { queryParamTestList,getQueryParamTestList } = queryParamTestStore;
    const { bodyTypeInfo,getBodyType,getMediaType } = requestBodyTestStore;
    const { formParamTestList,getFormParamTestList } = formParamTestStore;
    const { formUrlencodedTestList,getFormUrlencodedTestList } = formUrlencodedTestStore;
    const { rawParamTestInfo,getRawInfo } = rawParamTestStore;
    const { preParamTestInfo,getPreInfo } = preParamTestStore;
    const { afterParamTestInfo,getAfterInfo } = afterParamTestStore;
    const { assertParamTestList } = assertParamTestStore;

    const {globalHeaderList} = globalHeaderStore;

    const [ form ] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState();
    const [showResponse,setShowResponse]= useState(false);
    const [testResponse, setTestResponse] = useState();
    const [tabTip, setTabTip] = useState();
    const [afterScript, setAfterScript] = useState();
    const methodId = localStorage.getItem('apiId');

    useEffect(()=>{
        findApxMethod(methodId).then(res=>{
            // debugger
            setApiData(res)
            form.setFieldsValue({
                methodType: res.node?.methodType,
                path: res.apix?.path,
            })

            let tabTipObj = {};

            getRequestHeaderTestList(res.headerList);
            if(res.headerList) {
                tabTipObj.header = true;
            }

            getQueryParamTestList(res.queryList);
            if(res.queryList){
                tabTipObj.query = true;
            }

            getBodyType(res.request.bodyType);

            switch (res.request.bodyType){
                case "formdata":
                    getFormParamTestList(res.formList);
                    if(res.formList) {
                        tabTipObj.body = true;
                    }
                    break;
                case "formUrlencoded":
                    getFormUrlencodedTestList(res.urlencodedList);
                    if(res.formList){
                        tabTipObj.body = true;
                    }
                    break;
                case "json":
                    getJsonParam(res.jsonParam.jsonText)
                    if(res.jsonParam){
                        tabTipObj.body = true;
                    }
                case "raw":
                    getRawInfo(res.rawParam);
                    getMediaType(res.rawParam.type);

                    if(res.rawParam){
                        tabTipObj.body = true;
                    }
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
        let preUrl = values.host?values.host:testEnvUrl
        if(!values.host&&!testEnvUrl){
            messageFn("error","请输入请求地址")
            return;
        }

        setLoading(true)

        const allSendData = {
            "methodType":values.methodType,
            "url":preUrl+values.path,
            "headerList":requestHeaderTestList,
            "queryList":queryParamTestList,
            "bodyType":bodyTypeInfo,
            "formDataList":formParamTestList,
            "formUrlList":formUrlencodedTestList,
            "json":jsonData,
            "raw":rawParamTestInfo,
        }

        const globalParam = {
            header:globalHeaderList
        }

        //处理本地数据
        let localData = localDataProcess(allSendData)

        //前置
        let preObj
        try{
            if(preParamTestInfo){
                preObj =  execute(preParamTestInfo)
                console.log(preObj)
            }
        }catch {
            preObj ={}
        }


        //处理后的数据
        const processData = mergeTestData(localData,preObj,globalParam)


        //发送测试，返回结果
        let response =await sendTest(processData)
        if(!!response){
            if(assertParamTestList&&assertParamTestList.length>0){
                response.assertList =[ ...assertParamTestList];
            }

            //后置
            if(afterParamTestInfo){
                let data =execute(afterParamTestInfo,response)

                console.log("after-----",data)
                setAfterScript(data)
            }


            setTestResponse(response)

            setShowResponse(true)
        }

        setLoading(false)
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
                        { type: 'url', message: '请输入有效的 URL 地址' },
                    ]}
                >
                    <Input placeholder={"请输入HTTP开头的完整URL"}  />
                </Form.Item>
            )
        }
    }


    return(

        <>
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
                                    Object.keys(methodDictionary).map(item=>{
                                        return <Option value={item}  key={item}>{item.toUpperCase()}</Option>
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


                    <Button
                        className="important-btn"
                        onClick={onFinish}
                        loading={loading}
                        type="primary"
                    >
                        发送
                    </Button>
                </Form>
            </div>

            <div className='header-title ex-title'>请求</div>
            <div className={"white-bg-box"}>
                <TestRequest tabTip={tabTip}/>
            </div>

            <div className='header-title ex-title'>响应</div>
            <div className={"white-bg-box "}>
                <TestResultCommon
                    testResponse={testResponse}
                    showResponse={showResponse}
                    afterScript={afterScript}
                />
            </div>

        </>
    )
}


export default inject(
    "globalHeaderStore"
 )(observer(ApiTestContent));


