import React, {useEffect, useState} from "react";
import {Dropdown,Button, Form, Input, Select} from "antd";
import RequestTabQuickTest from "./RequestTabQuickTest";
import {observer} from "mobx-react";
import {localDataProcess, mergeTestData} from "../../common/request/sendTestCommon";
import {methodDictionary} from "../../common/dictionary/dictionary";
import {getUser} from "tiklab-core-ui";
import TestResultCommon from "../../api/http/test/common/TestResultCommon";
import {execute} from "../../api/http/test/common/dtAction";
import {DownOutlined} from "@ant-design/icons";
import SaveToApi from "./saveToApi";
import instanceStore from "../../api/http/test/instance/store/InstanceStore";
import quickTestStore from "../store/QuickTestStore";
import tabQuickTestStore from "../store/TabQuickTestStore";

const { Option } = Select;

/**
 * 快捷测试页
 */
const TestdetailQuickTest = (props) =>{
    const {sendTest} = props;

    const {createInstance,findInstanceList} = instanceStore;
    const { getRequestInfo, getResponseInfo, getResponseError,setResponseShow,isResponseShow,setResponseData, responseData} = quickTestStore;
    const {
        updateBaseInfo,activeKey,baseInfo, headerList,queryList,requestBodyType,
        formList,formUrlList,rawInfo,preScript,afterScript,assertList
    } = tabQuickTestStore

    const [ form ] = Form.useForm();

    const userId = getUser().userId;


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
            "methodType":values.methodType,
            "url":url,
            "headerList":headerList,
            "queryList":queryList,
            "bodyType":requestBodyType,
            "formDataList":formList,
            "formUrlList":formUrlList,
            "raw":rawInfo,
            "assertList":assertList,
        }

        //处理本地数据
        let localData = localDataProcess(allSendData)


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


        //数据合并
        const processData = mergeTestData(localData,preObj)
        //获取请求信息
        getRequestInfo(processData)


        //发送测试，返回结果
        let response =await sendTest(processData)

        //获取响应结果
        if(response&&!response.error){

            response.assertList = assertList;
            //获取响应结果
            setResponseData(response)

            getResponseInfo(response,assertList).then(res=>{
                saveInstance(res,localData)
            })

            //后置
            if(afterScript&&afterScript.scriptex){
                let data =execute(afterScript.scriptex,response)
                setAfterScript(data)
            }

            //点击测试按钮显示输出结果详情
            setResponseShow(true);
        }else {
            getResponseError(response).then((res)=>{
                saveInstance(res,localData)
            })
        }
    }

    /**
     * 保存历史
     */
    const saveInstance = (res,localData) =>{
        res.httpCase = {"id":"quickTestInstanceId"}
        res.workspaceId=workspaceId
        res.requestInstance = {
            "url":localData.url,
            "methodType": localData.methodType,
            "mediaType": localData.mediaType,
            'headers':JSON.stringify(localData.header),
            'body': JSON.stringify(localData.body)||localData.body,
            "preScript": preScript.scriptex,
            "afterScript": afterScript.scriptex
        }
        createInstance(res).then(async ()=>{
            let params={
                "workspaceId":workspaceId,
                "httpCaseId":"quickTestInstanceId",
                "userId":userId,
            }
            await findInstanceList(params)
        })
    }

    /**
     *
     * @returns {Promise<void>}
     */
    const changeInfo = async () =>{
        let value = await form.getFieldsValue()
        updateBaseInfo(value)
    }

    //请求类型下拉选择框
    const prefixSelector = (
        <Form.Item name="methodType" noStyle>
            <Select style={{width: 100}} onSelect={changeInfo}>
                {
                    methodDictionary.map(item=>{
                        return <Option value={item}  key={item}>{item.toUpperCase()}</Option>
                    })
                }
            </Select>
        </Form.Item>
    );

    //下拉，弹出 保存为接口
    const items = [{
            label: (<SaveToApi />),
            key: '1',
        }];

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
                                <Input
                                    onChange={changeInfo}
                                    placeholder={"请输入请求地址"}
                                    addonBefore={prefixSelector}
                                />
                            </Form.Item>
                        </div>
                        <div className={"test-base-item"}>
                            {
                                client==="electron"
                                    ?<Button type={"primary"} onClick={onFinish}>发送</Button>
                                    :<Dropdown.Button
                                        icon={<DownOutlined />}
                                        menu={{items}}
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
                        testResponse={responseData}
                        showResponse={isResponseShow}
                        afterScript={afterScriptex}
                    />
                </div>

            </div>
        </div>
    )
}

export default observer(TestdetailQuickTest)