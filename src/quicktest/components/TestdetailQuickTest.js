import React, {useEffect, useState} from "react";
import {Dropdown,Button, Form, Input, Select} from "antd";
import RequestTabQuickTest from "./RequestTabQuickTest";
import {inject, observer} from "mobx-react";
import {sendTestDataProcess} from "../../common/request/sendTestCommon";

import {methodJsonDictionary} from "../../common/dictionary/dictionary";
import {getUser} from "tiklab-core-ui";
import TestResultCommon from "../../api/http/test/common/TestResultCommon";
import {execute} from "../../api/http/test/common/dtAction";
import {DownOutlined} from "@ant-design/icons";
import SaveToApi from "./saveToApi";
import instanceStore from "../../api/http/test/instance/store/InstanceStore";
const { Option } = Select;
import quickTestStore from "../store/QuickTestStore";
import tabQuickTestStore from "../store/TabQuickTestStore";
/**
 * 快捷测试页
 */
const TestdetailQuickTest = (props) =>{
    const {sendRequest} = props;

    const {createInstance,findInstanceList} = instanceStore;
    const { getRequestInfo, getResponseInfo, getResponseError } = quickTestStore;
    const {
        updateBaseInfo,activeKey,baseInfo, headerList,queryList,requestBodyType,
        formList,formUrlList,rawInfo,preScript,afterScript,assertList
    } = tabQuickTestStore

    const [ form ] = Form.useForm();

    const userId = getUser().userId;

    const [showResponse,setShowResponse] = useState(false);
    const [testResponse, setTestResponse] = useState();
    const instanceId = localStorage.getItem("instanceId")
    const workspaceId = localStorage.getItem("workspaceId")
    const [afterScriptex, setAfterScript] = useState();


    useEffect(()=>{
        form.setFieldsValue(baseInfo)
    },[activeKey])


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
            "headerList":headerList,
            "queryList":queryList,
            "bodyType":requestBodyType,
            "formDataList":formList,
            "formUrlencoded":formUrlList,
            "rawParam":rawInfo,
            "assertList":assertList,
        }

        //获取请求信息
        getRequestInfo(allSendData)


        //前置
        let preObj
        try{
            if(preScript&&preScript.scriptex){
                preObj =  execute(preScript.scriptex)
                console.log(preObj)
            }
        }catch {
            preObj ={}
        }


        //处理后的数据
        const processData = sendTestDataProcess(allSendData,preObj)

        //发送测试，返回结果
        let response =await sendRequest(processData)

        //获取响应结果
        if(response&&!response.error){
            //获取响应结果
            setTestResponse(response)

            response.assertList = assertList;

            getResponseInfo(response,assertList).then(res=>{
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

            //后置
            if(afterScript&&afterScript.scriptex){
                let data =execute(afterScript.scriptex,response)
                setAfterScript(data)
            }


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


    const changeInfo = async () =>{
        let value = await form.getFieldsValue()
        updateBaseInfo(value)
    }

    //请求类型下拉选择框
    const prefixSelector = (
        <Form.Item name="methodType" noStyle>
            <Select style={{width: 100}} onSelect={changeInfo}>
                {
                    Object.keys(methodJsonDictionary).map(item=>{
                        return <Option value={item}  key={item}>{methodJsonDictionary[item]}</Option>
                    })
                }
            </Select>
        </Form.Item>
    );

    const items = [
        {
            label: (<SaveToApi />),
            key: '1',
        },
    ];

    return(
        <div style={{height: "100%","overflow":"auto"}} className={"content-margin"}>
            <div className={"content-margin-box"}>
                <div className={"test-base"}>
                    <Form
                        form = {form}
                        className="test-header"
                        // initialValues={{ methodType: "get" }}
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
                                <Input onChange={changeInfo} placeholder={"请输入请求地址"} addonBefore={prefixSelector}/>
                            </Form.Item>
                        </div>
                        <div className={"test-base-item"}>
                            {
                                client==="electron"
                                    ?<Button type={"primary"} onClick={onFinish}>发送</Button>
                                    :<Dropdown.Button
                                        icon={<DownOutlined />}
                                        menu={{items,}}
                                        onClick={onFinish}
                                        type={"primary"}
                                    >
                                        发送
                                    </Dropdown.Button>
                            }


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
                        afterScript={afterScriptex}
                    />
                </div>

            </div>
        </div>
    )
}

export default observer(TestdetailQuickTest)