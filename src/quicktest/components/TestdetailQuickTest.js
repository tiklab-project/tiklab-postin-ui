import React, {useEffect, useState} from "react";
import {Button, Form, Input, Select} from "antd";
import RequestTabQuickTest from "./RequestTabQuickTest";
import {inject, observer} from "mobx-react";
import {sendTestDataProcess} from "../../common/request/sendTestCommon";

import {
    methodJsonDictionary,
    bodyTypeJsonDictionary as bodyTypeJsonDic
} from "../../common/dictionary/dictionary";
import {
    processFormParamData,
    processFormUrlencodedData,
    processHeaderData,
    processQueryData
} from "../common/instanceDataProcess";
import {getUser} from "tiklab-core-ui";
import TestResultCommon from "../../api/http/test/common/TestResultCommon";
import IconCommon from "../../common/IconCommon";

const { Option } = Select;

/**
 * 快捷测试页
 */
const TestdetailQuickTest = (props) =>{
    const {
        getRes,
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

    const {findInstance,createInstance,findInstanceList} = instanceStore;
    const { getRequestInfo, getResponseInfo, setResponseShow,isResponseShow,getInstance,getResponseError } = quickTestStore;
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

    const [showResponse,setShowResponse] = useState(false);
    const [testResponse, setTestResponse] = useState();
    const instanceId = localStorage.getItem("instanceId")
    const workspaceId = localStorage.getItem("workspaceId")

    useEffect(()=>{
        if(instanceId!=="-1"){
            findInstance(instanceId).then(res=>{
                getInstance(res);
                let request = res.requestInstance;

                form.setFieldsValue({
                    methodType: request?.methodType,
                    path: request?.url,
                })

                if(res.errorMessage){
                    let errorValue = {
                        errorMessage:res.errorMessage,
                        showError:true
                    }
                    // setErrorMsg(errorValue)
                }else {
                    // setErrorMsg({showError:false})
                }

                getRequestHeaderTestList(processHeaderData(request.headers));
                getQueryParamTestList(processQueryData(request.url));


                let type = getMediaType(request?.mediaType)
                switch (type){
                    case bodyTypeJsonDic.none:
                        break;
                    case bodyTypeJsonDic.formdata:
                        getFormParamTestList(processFormParamData(res.formParamCaseList));
                        break;
                    case bodyTypeJsonDic.formUrlencoded:
                        getFormUrlencodedTestList(processFormUrlencodedData(res.formUrlencodedCaseList));
                        break;
                    case bodyTypeJsonDic.raw:
                        let rawInfo = {
                            raw:request?.body,
                            type:request?.mediaType
                        }
                        getRawInfo(rawInfo)
                        break;
                    default:
                        break;
                }

                getPreInfo(request?.preScript);
                getAfterInfo(request?.afterScript)
            })
        }else {
            form.setFieldsValue({
                methodType: "get",
                path: null,
            })
            getRequestHeaderTestList([]);
            getQueryParamTestList([]);
            getFormParamTestList([]);
            getFormUrlencodedTestList([]);
            getRawInfo({});
            getPreInfo();
            getAfterInfo()
        }
    },[instanceId])


    /**
     *  点击测试
     */
    const onFinish = async ()=> {
        let values =await form.getFieldsValue();

        //如果没有输入协议开头，默认给一个http
        let url;
        let protocol = values.path.substr(0,4);

        if(protocol==="http"){
            url=values.path
        }else {
            url="http://"+values.path
        }


        const allSendData = {
            "method":values.methodType,
            "path":url,
            "headerList":headerQuickTestList,
            "queryList":queryQuickTestList,
            "bodyType":bodyType,
            "formDataList":formQuickTestList,
            "formUrlencoded":formUrlencodedQuickTestList,
            "jsonList":jsonQuickTestList,
            "rawParam":rawQuickTestInfo,
            "assertList":assertQuickTestList,
        }

        //获取请求信息
        getRequestInfo(allSendData)

        //处理后的数据
        const processData = sendTestDataProcess(allSendData)

        //发送测试，返回结果
        let response =await getRes(processData)

        //获取响应结果
        if(response&&!response.error){
            //获取响应结果
            setTestResponse(response)

            response.assertList = assertQuickTestList;

            getResponseInfo(response,assertQuickTestList).then(res=>{
                res.httpCase = {"id":"quickTestInstanceId"}
                res.workspaceId=workspaceId
                createInstance(res).then(()=>{
                    let params={
                        "workspaceId":workspaceId,
                        "httpCaseId":"quickTestInstanceId",
                        "userId":userId,
                    }
                    findInstanceList(params)
                })
            })

            //点击测试按钮显示输出结果详情
            setShowResponse(true);
        }else {
            getResponseError(response).then((res)=>{
                res.httpCase = {"id":"quickTestInstanceId"}
                res.workspaceId=workspaceId
                createInstance(res).then(()=>{
                    let params={
                        "workspaceId":workspaceId,
                        "httpCaseId":"quickTestInstanceId",
                        "userId":userId,
                    }
                    findInstanceList(params)
                })
            })
        }


    }

    //请求类型下拉选择框
    const prefixSelector = (
        <Form.Item name="methodType" noStyle>
            <Select style={{width: 100}} >
                {
                    Object.keys(methodJsonDictionary).map(item=>{
                        return <Option value={item}  key={item}>{methodJsonDictionary[item]}</Option>
                    })
                }
            </Select>
        </Form.Item>
    );

    return(
        <div style={{height: "100%","overflow":"auto"}} className={"content-margin"}>
            <div className={"content-margin-box"}>
                <div className={"test-base"}>
                    <Form
                        form = {form}
                        className="test-header"
                        initialValues={{ methodType: "get" }}
                    >
                        <div className={"test-url"}>
                            <Form.Item
                                className='formItem'
                                name="path"
                                // rules={[
                                //     {
                                //         required: true,
                                //         pattern: new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/),
                                //         message: '请输入http开头的完整URL'
                                //     },
                                // ]}
                            >
                                <Input placeholder={"请输入请求地址"} addonBefore={prefixSelector}/>
                            </Form.Item>
                        </div>
                        <div className={"test-base-item"}>
                            <Button className="important-btn" onClick={onFinish} style={{display:"flex",alignItems:"center"}}>
                                <IconCommon
                                    icon={"fasong-copy"}
                                    style={{width:20,height:20}}
                                />
                                发送
                            </Button>
                        </div>
                    </Form>
                </div>

                <div className='header-title ex-title'>请求</div>
                <div className={"white-bg-box"}>
                    <RequestTabQuickTest instanceId={instanceId}/>
                </div>


                <div className='header-title ex-title'> 响应</div>
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