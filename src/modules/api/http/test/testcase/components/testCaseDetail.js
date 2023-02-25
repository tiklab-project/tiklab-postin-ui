import React, { useEffect, useState } from 'react';

import { observer, inject } from 'mobx-react';
import {Form, Button, Input, Select, Tooltip, Space} from 'antd';
import { TestCaseRequest } from "../index";
import DropdownInstance from "../../instance/components/histroyList";
import { sendTestDataProcess} from "../../../../../common/request/sendTestCommon";
import { methodJsonDictionary} from "../../../../../common/dictionary/dictionary";
import EdiText from "react-editext";
import TestResultCommon from "../../common/testResultCommon";
import IconCommon from "../../../../../common/iconCommon";

const {Option} = Select;

const TestCaseDetail = (props) => {

    const {
        getRes,
        testCaseStore,
        requestHeaderTestCaseStore,
        queryParamTestCaseStore,
        requestCaseStore,
        formParamTestCaseStore,
        formUrlencodedTestCaseStore,
        jsonParamTestCaseStore,
        rawParamTestCaseStore,
        // preParamTestCaseStore,
        // afterScriptTestCaseStore,
        assertParamTestCaseStore,
        instanceStore,
        environmentStore
    } = props;

    const {deleteTestCase,updateTestCase , findTestCase, getResponseInfo, getRequestInfo, getResponseError } = testCaseStore;
    const {testEnvUrl} = environmentStore;
    const { headerCaseDataSource,processHeaderCaseList } = requestHeaderTestCaseStore;
    const { queryParamTestCaseDataSource, processQueryCaseList } = queryParamTestCaseStore;
    const { bodyTypeCase, getBodyType,getMediaType} = requestCaseStore;
    const { formParamTestCaseDataSource,processFormList } = formParamTestCaseStore;
    const { formUrlencodedTestCaseDataSource,processFormUrlencodedList } = formUrlencodedTestCaseStore;
    const { jsonParamTestCaseList,processJsonParamList } = jsonParamTestCaseStore;
    const { rawParamTestCaseInfo,processRawInfo } = rawParamTestCaseStore;
    // const { preParamTestCaseInfo,getPreParamCaseInfo } =preParamTestCaseStore;
    // const { afterScriptTestCaseInfo,getAfterScriptCaseInfo } = afterScriptTestCaseStore;
    const { assertParamTestCaseDataSource } =assertParamTestCaseStore;
    const { createInstance  } = instanceStore;


    const [form] = Form.useForm();
    const [showResponse,setShowResponse] = useState(false);
    const [testResponse, setTestResponse] = useState();
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
            processHeaderCaseList(res.headerList);
            processQueryCaseList(res.queryList);
            getBodyType(res.request.bodyType);

            switch (res.request.bodyType){
                case "formdata":
                    processFormList(res.formList);
                    break;
                case "formUrlencoded":
                    processFormUrlencodedList(res.urlencodedList);
                    break;
                case "json":
                    processJsonParamList(res.jsonList);
                    break;
                case "raw":
                    processRawInfo(res.rawParamCase);
                    getMediaType(res.rawParamCase.type)
                    break;
                case "binary":
                    //问题
                    break;
                default:
                    break;
            }

            // getPreParamCaseInfo(res.request?.preScriptCase);
            // getAfterScriptCaseInfo(res.request?.afterScriptCase)
        })
    },[testCaseId])

    // 返回列表
    const backToList = () => {
        props.history.push('/workspace/apis/testcase')
    }

    // 删除用例
    const handleDeleteTestCase = () => {
        deleteTestCase(testCaseId);
        props.history.push('/workspace/apis/testcase')
    }

    // 测试
    const exeTest = async () => {

        let values =await form.getFieldsValue()

        const allSendData = {
            "method":values.methodType,
            "baseUrl":values.host?values.host:testEnvUrl,
            "path":values.path,
            "headerList":headerCaseDataSource,
            "queryList":queryParamTestCaseDataSource,
            "bodyType":bodyTypeCase,
            "formDataList":formParamTestCaseDataSource,
            "formUrlencoded":formUrlencodedTestCaseDataSource,
            "jsonList":jsonParamTestCaseList,
            "rawParam":rawParamTestCaseInfo,
            "assertList":assertParamTestCaseDataSource,
        }

        //处理后的数据
        const processData = sendTestDataProcess(allSendData)

        //发送测试，返回结果
        let response =await getRes(processData)

        response.assertList = assertParamTestCaseDataSource;
        //获取响应结果
        setTestResponse(response)

        //保存用例
        if(!response.error){
            getResponseInfo(response,assertParamTestCaseDataSource).then(res=>{
                res.httpCase = {"id":testCaseId}
                createInstance(res)
            })
        }else {
            getResponseError(response).then(res=>{
                res.httpCase = {"id":testCaseId}
                createInstance(res)
            })
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
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/),
                            message: '请输入http开头的完整URL'
                        },
                    ]}
                >
                    <Input  placeholder={"请输入http开头的完整URL"} />
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
                    <IconCommon
                        icon={"31fanhui1"}
                        style={{margin:"0 10px 0 0"}}
                        className={"icon-s testcase-header-right-back"}
                        onClick={backToList}
                    />
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

                    <Space className={"test-base-item"}>
                        <Button className="important-btn" onClick={exeTest}> 测试 </Button>
                        <Button onClick={()=>handleDeleteTestCase()} >删除</Button>
                    </Space>

                </Form>
            </div>

            <div className='header-title ex-title'>请求</div>
            <div className={"white-bg-box"}>
                <TestCaseRequest />
            </div>

            <div className='header-title ex-title'> 响应</div>
            <div className={"white-bg-box"}>
                <TestResultCommon
                    testResponse={testResponse}
                    showResponse={showResponse}
                />
            </div>
        </>
    )
}

export default inject(
    'testCaseStore',
    'requestHeaderTestCaseStore',
    'queryParamTestCaseStore',
    'requestCaseStore',
    'formParamTestCaseStore',
    "formUrlencodedTestCaseStore",
    'jsonParamTestCaseStore',
    'rawParamTestCaseStore',
    'assertParamTestCaseStore',
    'instanceStore',
    "environmentStore"
    )(observer(TestCaseDetail));
