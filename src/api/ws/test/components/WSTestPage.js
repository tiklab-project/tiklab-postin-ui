import React, {useEffect, useState} from "react";
import {Button} from "antd";
import "./WSTestStyle.scss";
import wsStore from "../../ws/store/WSStore";
import RequestTestWS from "./RequestTestWS";
import webSocketFnStore from "../store/WebSocketFnStore";
import {observer} from "mobx-react";
import TestResultWS from "./TestResultWS";
import {jsonSchemaToJson} from "../../../common/TestFunctionCommon";
import Mock from "mockjs";

const WSTestPage = ({tabKey}) =>{
    const {findWSApi,messageData,setUrl,querySourceList,setMessage,} = wsStore;
    const {
        connectWebSocket,
        disconnectWebSocket,
        sendMessage,
        readyState,
    } = webSocketFnStore

    const apiId = localStorage.getItem("apiId")
    const [wsInfo, setWsInfo] = useState();
    const [type, setType] = useState("text");

    useEffect(async ()=>{
        if(tabKey==="test"){
            let info = await findWSApi(apiId)
            setWsInfo(info)

            const {request,rawParam,jsonParam} = info
            switch (request.bodyType) {
                case "raw":
                    setType("text")
                    setMessage(rawParam?.raw);
                    break;
                case "json":
                    setType("json")
                    let processJson =jsonSchemaToJson(JSON.parse(jsonParam?.jsonText));
                    let json =  JSON.stringify(Mock.mock(processJson));
                    setMessage(json);
                    break;
            }
        }


    },[apiId])

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
            case 1:return <Button className={"important-btn"} type="primary" onClick={closeWs}>断开</Button>
            case 0:
            case 2:
            case 3:
                return <Button className={"important-btn"} type="primary" onClick={connectFn}>连接</Button>
            default:
                return <Button className={"important-btn"} type="primary" onClick={connectFn}>连接</Button>
        }

    }

    return(
        <>
            <div className={"ws-base-box"}>
                <div className={"ws-base-url"}>
                    <span style={{color:"white",background: "rgb(46 167 255)"}} className={"requestType"}>{wsInfo?.apix?.protocolType.toUpperCase()}</span>
                    <span style={{margin: "0 10px"}}>{wsInfo?.apix?.path}</span>
                </div>
                {
                    isConnectView()
                }
                <Button className={"important-btn"} type="primary" onClick={send}>发送</Button>
            </div>
            <RequestTestWS type={type} />
            <div style={{margin:"10px 0 "}}>报文列表</div>
            <TestResultWS />
        </>
    )
}

export default observer(WSTestPage);