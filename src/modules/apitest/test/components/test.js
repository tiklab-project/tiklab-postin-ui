import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Form, Input, Select, Button, Divider, Space, Tooltip} from 'antd';
import { TestRequest, TestResponse } from '../index';
import SaveTestCase from './saveTestcaseTest'
import './test.scss';
import {sendTest, sendTestDataProcess} from "../../common/sendTestCommon";
import {methodDictionary, methodJsonDictionary} from "../../../common/dictionary/dictionary";

const { Option } = Select;

// 接口测试组件
const ApxMethodTest = (props) => {
    const {
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
    const { getRequestInfo, getResponseInfo, getResponseError } = testStore;
    const { requestHeaderTestList,getRequestHeaderTestList } = requestHeaderTestStore;
    const { queryParamTestList,getQueryParamTestList } = queryParamTestStore;
    const { bodyTypeInfo,getBodyType } = requestBodyTestStore;
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
    const [errorMsg, setErrorMsg] = useState();
    const methodId = localStorage.getItem('apxMethodId');


    useEffect(()=>{
        findApxMethod(methodId).then(res=>{
            // debugger
            setApiData(res)
            form.setFieldsValue({
                methodType: res.methodType,
                path: res.path,
            })

            getRequestHeaderTestList(res.requestHeaderList);
            getQueryParamTestList(res.queryParamList);
            getBodyType(res.requestBody.bodyType);

            switch (res.requestBody.bodyType){
                case "formdata":
                    debugger
                    getFormParamTestList(res.formParamList);
                    break;
                case "formUrlencoded":
                    getFormUrlencodedTestList(res.formUrlencodedList);
                    break;
                case "json":
                    getJsonParamTestList(res.jsonParamList);
                    break;
                case "raw":
                    getRawInfo(res.rawParam)
                    break;
                case "binary":
                    //问题
                    break;
                default:
                    break;
            }

            getPreInfo(res.preScript);
            getAfterInfo(res.afterScript);
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
        const processData = sendTestDataProcess(allSendData)

        //发送测试，返回结果
        let response =await sendTest(processData)
        //获取请求参数
        getRequestInfo(processData)

        //获取响应结果
        if(!response.error){
            getResponseInfo(response,assertParamTestList)

            setErrorMsg({showError:false})
        }else {
            let errorValue = {
                errorMessage:response.error,
                showError:true
            }
            setErrorMsg(errorValue)
        }


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
                <Form.Item
                    className='formItem'
                    name="host"
                >
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
                        <Button className="important-btn" onClick={onFinish}> 测试 </Button>
                        <SaveTestCase  {...props}/>
                    </Space>
                </Form>

            </div>

            {/*<div className='title ex-title'>输入参数</div>*/}
            <div>
                <TestRequest {...props}/>
            </div>
            <div className='title ex-title'>
                测试结果
            </div>
            <TestResponse
                showResponse={showResponse}
                errorMsg={errorMsg}
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


