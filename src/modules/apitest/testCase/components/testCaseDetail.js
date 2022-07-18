import React, { useEffect, useState } from 'react';

import { observer, inject } from 'mobx-react';
import {Form, Button, Input, Select, Tooltip} from 'antd';
import { TestCaseRequest } from "../index";
import DropdownInstance from "../../testInstance/components/histroyList";
import TestResultCase from "./testResultCase";
import {sendTest, sendTestDataProcess} from "../../../common/request/sendTestCommon";
import { methodJsonDictionary} from "../../../common/dictionary/dictionary";
import EdiText from "react-editext";

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

    const {deleteTestCase,updateTestCase , findTestCase, getResponseInfo, getRequestInfo, getResponseError } = testCaseStore;
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
    const [errorMsg, setErrorMsg] = useState();
    const [caseName, setCaseName] = useState();
    const testCaseId = localStorage.getItem("testCaseId");
    const methodId =  localStorage.getItem('apxMethodId');

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
        props.history.push('/workspace/apis/detail/interface/testcase')
    }

    // 删除用例
    const handleDeleteTestCase = () => {
        deleteTestCase(testCaseId);
        props.history.push('/workspace/apis/detail/interface/testcase')
    }

    // 测试
    const exeTest = async () => {
        let values =await form.getFieldsValue()

        const allSendData = {
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
        }

        //处理后的数据
        const processData = sendTestDataProcess(allSendData)

        //发送测试，返回结果
        let response =await sendTest(processData)

        //获取请求参数
        getRequestInfo(processData)

        //获取响应结果
        if(!response.error){
            getResponseInfo(response,assertParamTestCaseDataSource).then(res=>{
                res.httpCase = {"id":testCaseId}
                createInstance(res)
            })

            setErrorMsg({showError:false})
        }else {

            getResponseError(response).then(res=>{
                res.httpCase = {"id":testCaseId}
                createInstance(res)
            })

            //用于错误展示
            let errorValue = {
                errorMessage:response.error,
                showError:true
            }
            setErrorMsg(errorValue)
        }

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

    //编辑名称
    const editName = (value) => {
        let param = {
            http:{id:methodId},
            id:testCaseId,
            name:value
        }
        updateTestCase(param)
    };

    return(
        <>
            <div className='testCase-baseInfo'>
                <div className={"testcase-header-right"}>
                    <div className={"testcase-header-right-back"} onClick={backToList}>用例列表</div>
                    <div >/</div>
                    <EdiText
                        value={caseName}
                        tabIndex={2}
                        onSave={editName}
                        startEditingOnFocus
                        submitOnUnfocus
                        showButtonsOnHover
                        viewProps={{ className: 'edit-api-title' }}
                        editButtonClassName="ediText-edit"
                        saveButtonClassName="ediText-save"
                        cancelButtonClassName="ediText-cancel"
                        editButtonContent={
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-bianji1`} />
                            </svg>
                        }
                        hideIcons
                    />
                </div>

                <DropdownInstance testcaseId={testCaseId}/>
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
            <TestResultCase
                showResponse={showResponse}
                errorMsg={errorMsg}
            />
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
