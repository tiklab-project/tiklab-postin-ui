import React from "react";
import {observer} from "mobx-react";
import {Col, Collapse, Row} from "antd";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import ReactMonacoEditor from "../../../../common/monacoEditor/ReactMonacoEditor";
import {ArrowDownOutlined, ArrowUpOutlined, CheckCircleTwoTone, CloseSquareOutlined} from "@ant-design/icons";
import webSocketFnStore from "../store/WebSocketFnStore";
import "./WSTestStyle.scss"

const { Panel } = Collapse;

const TestResultWS = (props) =>{
    const {CONNECT_TYPE,messageList,clearAll} = webSocketFnStore

    const showListView = (list) =>{

        if(list&&list.length>0){
           return  list.map((item,index)=>{
               const {type,content,time} = item

                switch (type) {
                    case CONNECT_TYPE.CONNECT:
                        return panelView(<CheckCircleTwoTone twoToneColor="#52c41a" />, content, time, index)

                    case CONNECT_TYPE.DISCONNECT:
                        return panelView(<CloseSquareOutlined  />, content, time, index)

                    case CONNECT_TYPE.SEND:
                        return panelView(<ArrowUpOutlined style={{color:"#37ae1b"}}  />, content, time, index)

                    case CONNECT_TYPE.RECEIVE:
                        return panelView(<ArrowDownOutlined style={{color:"#1890ff"}}  />, content, time, index)

                    case CONNECT_TYPE.ERROR:
                        return panelView(<CloseSquareOutlined style={{color:"red"}} />, content, time, index)

                }
            })
        }
    }

    const panelView = (icon,content,time,index) =>{

        return (
            <Panel header={
                <Row >
                    <Col span={1}>{icon}</Col>
                    <Col span={21} className={"ws-result-content"}>{content}</Col>
                    <Col span={2}>{time}</Col>
                </Row>
            } key={index}>
                <ReactMonacoEditor
                    value={content}
                    // language={"text"}
                    height={"200px"}
                    width={"100%"}
                    readOnly={true}
                />
            </Panel>
        )
    }


    return(
        <div className={"ws-result-box"}>
            <div className={"ws-result-header"}>
                <IconBtn
                    className="pi-icon-btn-grey"
                    name={"清空列表"}
                    onClick={clearAll}
                />
            </div>
            <div className={"ws-result-list"}>
                <Collapse expandIcon={null}  expandIconPosition={"end"}>
                    {
                        showListView(messageList)
                    }
                </Collapse>
            </div>
        </div>
    )
}




export default observer(TestResultWS);