import React, {useEffect, useState} from "react";
import {Button} from "antd";
import "./WSTestStyle.scss";
import wsStore from "../../ws/store/WSStore";
import RequestTestWS from "./RequestTestWS";
import webSocketFnStore from "../store/WebSocketFnStore";
import {observer} from "mobx-react";
import TestResultWS from "./TestResultWS";

const WSTestPage = () =>{
    const {findWSApi,messageData,setUrl,querySourceList} = wsStore;
    const {
        connectWebSocket,
        disconnectWebSocket,
        sendMessage,
        readyState,
    } = webSocketFnStore

    const apiId = localStorage.getItem("apiId")
    const [wsInfo, setWsInfo] = useState();

    useEffect(async ()=>{
        let info = await findWSApi(apiId)
        setWsInfo(info)
    },[])

    const connectFn = () =>{
        let url = setUrl(wsInfo?.apix?.path,querySourceList)
        connectWebSocket(url)
    }

    const send = () =>{
        sendMessage(messageData);
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

    return(
        <div className={"content-margin page-padding"} style={{height: "calc(100% - 50px)"}}>
            <div className="content-margin-box">
                <div className={"ws-base-box"}>
                    <div className={"ws-base-url"}>
                        <span style={{color:"white",background: "rgb(46 167 255)"}} className={"requestType"}>{wsInfo?.apix?.protocolType.toUpperCase()}</span>
                        <span style={{margin: "0 10px"}}>{wsInfo?.apix?.path}</span>
                    </div>
                    {
                        isConnectView()
                    }
                    <Button className={"important-btn"} onClick={send}>发送</Button>
                </div>
                <RequestTestWS />
                <div style={{margin:"10px 0 "}}>报文列表</div>
                <TestResultWS />
            </div>

        </div>
    )
}

export default observer(WSTestPage);