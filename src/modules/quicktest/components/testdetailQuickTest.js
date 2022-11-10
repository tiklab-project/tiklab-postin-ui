import React, {useEffect, useState} from "react";
import {Button, Form, Input, Select} from "antd";
import RequestTabQuickTest from "./requestTabQuickTest";
import {inject, observer} from "mobx-react";
import {localProxySendTest, sendTest, sendTestDataProcess} from "../../common/request/sendTestCommon";
import ResponseQuickTest from "./responseQuickTest";
import {
    methodDictionary,
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
import TestResultCommon from "../../apitest/common/testResultCommon";
import IconCommon from "../../common/iconCommon";

const { Option } = Select;

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
    let proxyItem = localStorage.getItem("PROXY_ITEM")
        ?localStorage.getItem("PROXY_ITEM")
        :"default";

    useEffect(()=>{
        if(instanceId!=="-1"){
            findInstance(instanceId).then(res=>{
                getInstance(res);
                let request = res.requestInstance;

                form.setFieldsValue({
                    methodType: request?.methodType,
                    path: request?.url,
                })
                debugger

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
                    case bodyTypeJsonDic.json:
                        getJsonParamTestList(res.jsonParamCaseList);
                        break;
                    case bodyTypeJsonDic.raw:
                        let rawInfo = {
                            raw:request?.body,
                            type:request?.mediaType
                        }
                        getRawInfo(rawInfo)
                        break;
                    // case bodyTypeJsonDic.binary:
                        //问题
                        // break;
                    default:
                        break;
                }

                getPreInfo(request?.preScript);
                getAfterInfo(request?.afterScript)
            })
        }
    },[instanceId])


    // 点击测试
    const onFinish = async ()=> {
        let values =await form.getFieldsValue();

        const allSendData = {
            "method":values.methodType,
            "path":values.path,
            "headerList":headerQuickTestList,
            "queryList":queryQuickTestList,
            "bodyType":bodyType,
            "formDataList":formQuickTestList,
            "formUrlencoded":formUrlencodedQuickTestList,
            "jsonList":jsonQuickTestList,
            "rawParam":rawQuickTestInfo,
            "assertList":assertQuickTestList,
        }

        //处理后的数据
        const processData = sendTestDataProcess(allSendData)

        //发送测试，返回结果
        let response =await getRes(processData)

        response.assertList = assertQuickTestList;
        //获取响应结果
        setTestResponse(response)

        //获取响应结果
        if(response&&!response.error){
            getResponseInfo(response,assertQuickTestList).then(res=>{
                res.httpCase = {"id":"quickTestInstanceId"}
                createInstance(res).then(()=>{
                    let params={
                        "httpCaseId":"quickTestInstanceId",
                        "userId":userId,
                    }
                    findInstanceList(params)
                })
            })

        }else {
            getResponseError(response).then((res)=>{
                res.httpCase = {"id":"quickTestInstanceId"}
                createInstance(res).then(()=>{
                    let params={
                        "httpCaseId":"quickTestInstanceId",
                        "userId":userId,
                    }
                    findInstanceList(params)
                })
            })

        }

        //点击测试按钮显示输出结果详情
        setShowResponse(true);
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
        <div className={"quicktest-box-margin"}>
            <div className={"quicktest-contant-box"}>
                <div className={"test-base"}>
                    <Form
                        form = {form}
                        className="test-header"
                        initialValues={{ methodType: "get" }}
                    >
                        <div className={"test-url"}>
                            <Form.Item className='formItem' name="path" >
                                <Input  addonBefore={prefixSelector}/>
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
                <RequestTabQuickTest instanceId={instanceId}/>

                <div className='header-title ex-title'> 响应</div>
                <TestResultCommon
                    testResponse={testResponse}
                    showResponse={showResponse}
                />
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