import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";
import TestResultWS from "../../../api/ws/test/components/TestResultWS";
import RequestWSQuickTest from "./RequestWSQuickTest";
import webSocketFnStore from "../../../api/ws/test/store/WebSocketFnStore";
import wsQuickTestStore from "../store/wsQuikTestStore";
import {observer} from "mobx-react";
import tabQuickTestStore from "../../store/TabQuickTestStore";

const WSTest = (props) => {
    const {toggleProtocol} = props
    const {updateBaseInfo,activeKey,baseInfo, queryList, rawInfo} = tabQuickTestStore
    let {setUrl} = wsQuickTestStore

    const {
        connectWebSocket,
        disconnectWebSocket,
        sendMessage,
        readyState,
    } = webSocketFnStore

    const [ form ] = Form.useForm();

    useEffect(()=>{
        form.setFieldsValue(baseInfo)
    },[activeKey])


    const connectFn = async () =>{
        let value = await form.getFieldsValue()
        let url = setUrl(value.path,queryList)
        connectWebSocket(url)
    }
    const send =  () =>{
        sendMessage(rawInfo.raw);
    }

    const closeWs = () =>{
        disconnectWebSocket()
    }

    const isConnectView = () =>{

        switch (readyState) {
            case 1:return <Button className={"important-btn"} onClick={closeWs}>断开</Button>
            case 0:
            case 2:
            case 3:
                return <Button className={"important-btn"} onClick={connectFn}>连接</Button>
            default:
                return <Button className={"important-btn"} onClick={connectFn}>连接</Button>
        }

    }

    const changeInfo = async () =>{
        let value = await form.getFieldsValue()
        updateBaseInfo(value)
    }

    return(
        <div className={"content-margin"}>
            <div className={"content-margin-box"}>
                <div className={"test-base"}>
                    <Form
                        form = {form}
                        className="test-header"
                        initialValues={{ methodType: "get" }}
                    >
                        {toggleProtocol()}
                        <div className={"test-url"}>

                            <Form.Item
                                className='formItem'
                                name="path"
                                rules={[{
                                    required: true,
                                    message: '请输入http开头的完整URL',
                                    // type:"url"
                                }]}
                            >
                                <Input
                                    onChange={changeInfo}
                                    placeholder={"请输入请求地址"}
                                />
                            </Form.Item>
                        </div>
                        {
                            isConnectView()
                        }
                        <Button className={"important-btn"} onClick={send}>发送</Button>
                    </Form>
                </div>
                <div className={"white-bg-box"}>
                    <RequestWSQuickTest />
                </div>
                <div style={{margin:"10px 0 "}}>报文列表</div>
                <div className={"white-bg-box"}>
                    <TestResultWS />
                </div>
            </div>

        </div>
    )
}

export default observer(WSTest);