import React, { useEffect, useState } from 'react';
import {
    darth,
    handelResult,
    getHeader,
    getParam,
    getForm,
    getJson,
    getRaw,
    getUrl,
    getBaseUrl,
    getMethod,
} from '../../index';
import { observer, inject } from 'mobx-react';
import {Form, Button, Input, Select, Tooltip} from 'antd';
import { TestCaseRequest } from "../index";
import DropdownInstance from "../../testInstance/components/dropdownInstance";
import TestResultCase from "./testResultCase";
import {sendTestDataProcess} from "../../common/sendTestCommon";
import {methodDictionary, methodJsonDictionary} from "../../../common/dictionary/dictionary";
import BackCommon from "../../../common/backCommon";

const {Option} = Select;

const TestCaseDetail = (props) => {

    const {
        testCaseStore,
        requestHeaderTestCaseStore,
        queryParamTestCaseStore,
        requestBodyTestCaseStore,
        formParamTestCaseStore,
        formUrlencodedTestCaseStore,
        jsonParamTestCaseStore,
        rawParamTestCaseStore,
        preParamTestCaseStore,
        afterScriptTestCaseStore,
        assertParamTestCaseStore,
        instanceStore,
        environmentStore
    } = props;

    const {deleteTestCase, findTestCase, getResponseInfo, getRequestInfo, getTime } = testCaseStore;
    const {testEnvUrl} = environmentStore;
    const { requestHeaderTestCaseDataSource,processHeaderCaseList } = requestHeaderTestCaseStore;
    const { queryParamTestCaseDataSource, processQueryCaseList } = queryParamTestCaseStore;
    const { requestBodyTestCaseInfo, getBodyType} = requestBodyTestCaseStore;
    const { formParamTestCaseDataSource,processFormList } = formParamTestCaseStore;
    const { formUrlencodedTestCaseDataSource,processFormUrlencodedList } = formUrlencodedTestCaseStore;
    const { jsonParamTestCaseList,processJsonParamList } = jsonParamTestCaseStore;
    const { rawParamTestCaseInfo,processRawInfo } = rawParamTestCaseStore;
    const { preParamTestCaseInfo,getPreParamCaseInfo } =preParamTestCaseStore;
    const { afterScriptTestCaseInfo,getAfterScriptCaseInfo } = afterScriptTestCaseStore;
    const { assertParamTestCaseDataSource } =assertParamTestCaseStore;
    const { createInstance  } = instanceStore;

    let dt =  {...darth}  //解构darth里的方法

    console.log(dt.md5("12345"))

    const [form] = Form.useForm();
    const [showResponse,setShowResponse] = useState(false);
    const [caseName, setCaseName] = useState();
    const testCaseId = localStorage.getItem("testCaseId");

    useEffect(() => {
        findTestCase(testCaseId).then(res=>{
            setCaseName(res.name);
            form.setFieldsValue({
                name: res.name,
                methodType: res.http.methodType,
                path: res.http.path,
            })
            processHeaderCaseList(res.requestHeaderCaseList);
            processQueryCaseList(res.queryParamCaseList);
            getBodyType(res.requestBodyCase.bodyType);

            switch (res.requestBodyCase.bodyType){
                case "formdata":
                    processFormList(res.formParamCaseList);
                    break;
                case "formUrlencoded":
                    processFormUrlencodedList(res.formUrlencodedCaseList);
                    break;
                case "json":
                    processJsonParamList(res.jsonParamCaseList);
                    break;
                case "raw":
                    processRawInfo(res.rawParamCase)
                    break;
                case "binary":
                    //问题
                    break;
                default:
                    break;
            }

            getPreParamCaseInfo(res.preScriptCase);
            getAfterScriptCaseInfo(res.afterScriptCase)
        })
    },[testCaseId])

    // 返回列表
    const backToList = () => {
        props.history.push({pathname:'/workspace/apis/detail/interface/testcase',state:{tabKey:'3'}})
    }

    // 删除用例
    const handleDeleteTestCase = () => {
        deleteTestCase(testCaseId);
        props.history.push({pathname:'/workspace/apis/detail/interface/testcase'})
    }

    // 测试
    const exeTest = (values) => {
        const allSendData = {
            "getTime":getTime,
            "getRequestInfo":getRequestInfo,
            "getResponseInfo":getResponseInfo,
            "belongId":testCaseId,
            "createInstance":createInstance,
            "method":values.methodType,
            "baseUrl":values.host?values.host:testEnvUrl,
            "path":values.path,
            "headerList":requestHeaderTestCaseDataSource,
            "queryList":queryParamTestCaseDataSource,
            "bodyType":requestBodyTestCaseInfo,
            "formDataList":formParamTestCaseDataSource,
            "formUrlencoded":formUrlencodedTestCaseDataSource,
            "jsonList":jsonParamTestCaseList,
            "rawParam":rawParamTestCaseInfo,
            "assertList":assertParamTestCaseDataSource,
            "preScript":preParamTestCaseInfo,
            "afterScript":afterScriptTestCaseInfo,
        }

        sendTestDataProcess(allSendData)

        //点击测试按钮显示输出结果详情
        setShowResponse(true);
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
        <>
            <div className='testCase-baseInfo'>
                <BackCommon clickBack={backToList} />
                {/*<div>*/}
                {/*    <Button onClick={backToList}>*/}
                {/*        <svg className="icon" aria-hidden="true"  style={{cursor:"pointer"}}>*/}
                {/*            <use xlinkHref= {`#icon-fanhui`}> </use>*/}
                {/*        </svg>*/}
                {/*        返回*/}
                {/*    </Button>*/}
                {/*    /!*<span className={"testcase-name"}>{caseName}</span>*!/*/}
                {/*    <span className={"testcase-name"}>{caseName}</span>*/}
                {/*</div>*/}

                <div>
                    <DropdownInstance testcaseId={testCaseId}/>
                    {/*<a style={{margin:"0 0 0 10px"}} onClick={()=> backToList()}>返回</a>*/}
                </div>
            </div>
            <div className={"test-base"}>
                <Form
                    onFinish={exeTest}
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
                            rules={[{required: true, message: '接口的path'}]}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </div>
                    <div className={"test-base-item"}>
                        <Form.Item className='test-button'>
                            <Button className="important-btn" htmlType="submit">
                                测试
                            </Button>
                        </Form.Item>
                    </div>
                    <div className={"test-base-item"}>
                        <Button onClick={()=>handleDeleteTestCase()} >删除</Button>
                    </div>
                </Form>
            </div>
            <TestCaseRequest />
            <div className='title ex-title'>
                测试结果
            </div>
            <TestResultCase showResponse={showResponse}/>
        </>
    )
}

export default inject(
    'testCaseStore',
    'requestHeaderTestCaseStore',
    'queryParamTestCaseStore',
    'requestBodyTestCaseStore',
    'formParamTestCaseStore',
    "formUrlencodedTestCaseStore",
    'jsonParamTestCaseStore',
    'rawParamTestCaseStore',
    'preParamTestCaseStore',
    'afterScriptTestCaseStore',
    'assertParamTestCaseStore',
    'instanceStore',
    "environmentStore"
    )(observer(TestCaseDetail));
