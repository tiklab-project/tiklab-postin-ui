import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Form, Input, Select, Button, Divider, Space, Tooltip} from 'antd';
import { TestRequest } from '../index';
import SaveTestCase from './saveTestcaseTest'
import './test.scss';
import { sendTestDataProcess} from "../../../common/request/sendTestCommon";
import { methodJsonDictionary} from "../../../common/dictionary/dictionary";
import {execute} from "../../common/dtAction";
import TestResultCommon from "../../common/testResultCommon";


const { Option } = Select;

// 接口测试组件
const ApxMethodTest = (props) => {
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
    } = props;

    const {findApxMethod} = apxMethodStore;
    const {testEnvUrl} = environmentStore;
    const { getResponseInfo, getResponseError } = testStore;
    const { requestHeaderTestList,getRequestHeaderTestList } = requestHeaderTestStore;
    const { queryParamTestList,getQueryParamTestList } = queryParamTestStore;
    const { bodyTypeInfo,getBodyType,getMediaType } = requestBodyTestStore;
    const { formParamTestList,getFormParamTestList } = formParamTestStore;
    const { formUrlencodedTestList,getFormUrlencodedTestList } = formUrlencodedTestStore;
    const { jsonParamTestList,getJsonParamTestList } = jsonParamTestStore;
    const { rawParamTestInfo,getRawInfo } = rawParamTestStore;
    const { preParamTestInfo,getPreInfo } = preParamTestStore;
    const { afterParamTestInfo,getAfterInfo } = afterParamTestStore;
    const { assertParamTestList } = assertParamTestStore;


    const [ form ] = Form.useForm();

    const [apiData, setApiData] = useState();
    const [showResponse,setShowResponse]= useState(false);
    const [testResponse, setTestResponse] = useState();
    const methodId = localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findApxMethod(methodId).then(res=>{
            // debugger
            setApiData(res)
            form.setFieldsValue({
                methodType: res.methodType,
                path: res.path,
            })

            getRequestHeaderTestList(res.headerList);
            getQueryParamTestList(res.queryList);
            getBodyType(res.request.bodyType);

            switch (res.request.bodyType){
                case "formdata":
                    getFormParamTestList(res.formList);
                    break;
                case "formUrlencoded":
                    getFormUrlencodedTestList(res.urlencodedList);
                    break;
                case "json":
                    getJsonParamTestList(res.jsonList);
                    break;
                case "raw":
                    getRawInfo(res.rawParam);
                    getMediaType(res.rawParam.type);
                    break;
                case "binary":
                    //问题
                    break;
                default:
                    break;
            }

            // getPreInfo(res.request.preScript);
            // getAfterInfo(res.request.afterScript);
        })
    },[methodId])



    // 点击测试
    const onFinish =async ()=> {

        let values =await form.getFieldsValue()

        const allSendData = {
            "method":values.methodType,
            "baseUrl":values.host?values.host:testEnvUrl,
            "path":values.path,
            "headerList":requestHeaderTestList,
            "queryList":queryParamTestList,
            "bodyType":bodyTypeInfo,
            "formDataList":formParamTestList,
            "formUrlencoded":formUrlencodedTestList,
            "jsonList":jsonParamTestList,
            "rawParam":rawParamTestInfo,
        }


        //处理后的数据
        const processData = sendTestDataProcess(allSendData,preParamTestInfo)

        //发送测试，返回结果
        let response =await getRes(processData)

        response.assertList = assertParamTestList;
        setTestResponse(response)


        setShowResponse(true)
    }



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
                <Form.Item name="host" className='formItem'>
                    <Input />
                </Form.Item>
            )
        }
    }

    return(
        <Fragment>
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

                    <Space>
                        <Button className="important-btn" onClick={onFinish}> 发送 </Button>
                        <SaveTestCase  {...props}/>
                    </Space>
                </Form>
            </div>

            <div className='header-title ex-title'>请求</div>
            <TestRequest {...props}/>

            <div className='header-title ex-title'>响应</div>
            <TestResultCommon
                testResponse={testResponse}
                showResponse={showResponse}
            />
        </Fragment>
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
    "apxMethodStore"
 )(observer(ApxMethodTest));


