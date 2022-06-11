import React, {useEffect, useState} from "react";
import {Button, Form, Input, Select} from "antd";
import RequestTabQuickTest from "./requestTabQuickTest";
import {inject, observer} from "mobx-react";
import {sendTestDataProcess} from "../../apitest/common/sendTestCommon";
import ResponseQuickTest from "./responseQuickTest";
import {methodDictionary, methodJsonDictionary} from "../../common/dictionary/dictionary";
import {processHeaderData, processQueryData} from "../common/instanceDataProcess";
import {getUser} from "doublekit-core-ui";

const { Option } = Select;

const TestdetailQuickTest = (props) =>{
    const {
        instanceStore,
        quickTestStore,
        headerQuickTestStore,
        queryQuickTestStore,
        requestBodyQuickTestStore,
        formDataQuickTestStore,
        formUrlencodedQuickTestStore,
        jsonQuickTestStore,
        rawQuickTestStore,
        preScriptQuickTestStore,
        afterScriptQuickTestStore,
        assertQuickTestStore
    } = props;

    const {findInstance,createInstance} = instanceStore;
    const { getRequestInfo, getResponseInfo, getTime,setResponseShow,isResponseShow,getInstance } = quickTestStore;
    const {headerQuickTestList,getRequestHeaderTestList} = headerQuickTestStore;
    const {queryQuickTestList,getQueryParamTestList} = queryQuickTestStore;
    const {bodyType,getBodyType,getMediaType} = requestBodyQuickTestStore;
    const {formQuickTestList,getFormParamTestList} = formDataQuickTestStore;
    const {formUrlencodedQuickTestList,getFormUrlencodedTestList} = formUrlencodedQuickTestStore;
    const {jsonQuickTestList,getJsonParamTestList} = jsonQuickTestStore;
    const {rawQuickTestInfo,getRawInfo} = rawQuickTestStore;
    const {preQuickTestInfo,getPreInfo} = preScriptQuickTestStore;
    const {afterQuickTestInfo,getAfterInfo} = afterScriptQuickTestStore;
    const {assertQuickTestList} = assertQuickTestStore;

    const [ form ] = Form.useForm();

    const userId = getUser().userId;
    const instanceId = localStorage.getItem("instanceId")

    useEffect(()=>{
        if(instanceId!=="-1"){
            findInstance(instanceId).then(res=>{
                let request = res.requestInstance;
                let resInstance = res.responseInstance;
                getInstance(res,resInstance);

                form.setFieldsValue({
                    // baseUrl:res.baseUrl,
                    requestType: request?.methodType,
                    path: request?.url,
                })

                getRequestHeaderTestList(processHeaderData(request.headers));
                getQueryParamTestList(processQueryData(request.url));

                getMediaType(request?.mediaType)
                switch (bodyType){
                    case "formdata":
                        getFormParamTestList(res.formParamCaseList);
                        break;
                    case "formUrlencoded":
                        getFormUrlencodedTestList(res.formUrlencodedCaseList);
                        break;
                    case "json":
                        getJsonParamTestList(res.jsonParamCaseList);
                        break;
                    case "raw":
                        let rawInfo = {
                            raw:request?.body,

                        }
                        getRawInfo(rawInfo)
                        break;
                    case "binary":
                        //问题
                        break;
                    default:
                        break;
                }

                getPreInfo(request?.preScript);
                getAfterInfo(request?.afterScript)
            })
        }
    },[instanceId])


    // 点击测试
    const onFinish = (values)=> {
        const allSendData = {
            "userId":userId,
            "getTime":getTime,
            "getRequestInfo":getRequestInfo,
            "getResponseInfo":getResponseInfo,
            "belongId":"quickTestInstanceId",
            "createInstance":createInstance,
            "method":values.requestType,
            "baseUrl":values.baseUrl,
            "path":values.path,
            "headerList":headerQuickTestList,
            "queryList":queryQuickTestList,
            "bodyType":bodyType,
            "formDataList":formQuickTestList,
            "formUrlencoded":formUrlencodedQuickTestList,
            "jsonList":jsonQuickTestList,
            "rawParam":rawQuickTestInfo,
            "assertList":assertQuickTestList,
            "preScript":preQuickTestInfo,
            "afterScript":afterQuickTestInfo,
        }

        sendTestDataProcess(allSendData)
        setResponseShow()
    }

    //请求类型下拉选择框
    const prefixSelector = (
        <Form.Item name="requestType" noStyle>
            <Select style={{width: 100}} defaultValue={"get"} >
                {
                    Object.keys(methodJsonDictionary).map(item=>{
                        return <Option value={item}  key={item}>{methodJsonDictionary[item]}</Option>
                    })
                }
            </Select>
        </Form.Item>
    );

    return(
        <div className={"quicktest-contant-box"}>
            <div className={"test-base"}>
                <Form
                    onFinish={onFinish}
                    form = {form}
                    className="test-header"
                >
                    <div className={"test-url"}>
                        <Form.Item
                            className='formItem'
                            name="path"
                            rules={[{required: true,message: '接口的path'}]}
                        >
                            <Input  addonBefore={prefixSelector}/>
                        </Form.Item>
                    </div>
                    <div className={"test-base-item"}>
                        <Form.Item className='test-button'>
                            <Button className="important-btn" htmlType="submit">
                                测试
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div>
                <RequestTabQuickTest instanceId={instanceId}/>
            </div>
            <div className='title ex-title'>
                测试结果
            </div>
            <div>
                <ResponseQuickTest showResponse={isResponseShow}/>
            </div>
        </div>
    )
}

export default inject(
    "instanceStore",
    "quickTestStore",
    "headerQuickTestStore",
    "queryQuickTestStore",
    "requestBodyQuickTestStore",
    "formDataQuickTestStore",
    "formUrlencodedQuickTestStore",
    "jsonQuickTestStore",
    "rawQuickTestStore",
    "preScriptQuickTestStore",
    "afterScriptQuickTestStore",
    'assertQuickTestStore'
    )(observer(TestdetailQuickTest))