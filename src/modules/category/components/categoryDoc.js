import React, { useState} from "react";
import ShareTree from "./shareTree";
import MethodType from "../../common/methodType";
import TableHeaderDoc from "../../common/apiDoc/tableHeaderDoc";
import TableQueryDoc from "../../common/apiDoc/tableQueryDoc";
import RequestBodyDoc from "../../common/apiDoc/requestBodyDoc";
import {inject, observer} from "mobx-react";

const ApiDoc = (props) =>{

    const [apiDoc, setApiDoc] = useState();



    const showContentType =(data)=>{
        switch (data?.request?.bodyType) {
            case "formdata":
                return "multipart/form-data";
            case "formUrlencoded":
                return "application/x-www-form-urlencode";
            case "raw":
                return  data.rawParam.type
        }
    }

    const clickAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            const anchorElement = document.getElementById(anchorName)
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
            }
        }
    }


    let anchorItem =[
        {
            key: "share-base-info",
            name:"基础信息"
        },{
            key: "share-request-info",
            name:"请求参数"
        },{
            key: "share-response-info",
            name:"响应示例"
        },
    ]

    const anchor = (data) =>{
        return data.map(item=>{
            return(
                <div
                    className={"share-anchor-item"}
                    key={item.key}
                    onClick={()=>clickAnchor(item.key)}
                >
                    {item.name}
                </div>
            )
        })
    }


    return(
        <>
            <div className={"share-box"}>
                <div className={"share-box-left"}>
                    <ShareTree setApiDoc={setApiDoc}/>
                </div>
                <div className={"share-box-right"}  id={"share-right-content"} >
                    <div className={"share-box-right-content"}>
                        <div className={"share-box-right-detail-content"}>
                            <div className={"share-box-right-content-item"}>
                                <div className={"share-box-api-title"}>{apiDoc?.name}</div>
                                <div className={"share-box-right-content-item-detail"}>
                                    <div>
                                        <span className={"share-detail-title"}>负责人: {apiDoc?.executor?.name||"孙现诚"}</span>
                                    </div>
                                    <div>
                                        <span className={"share-detail-title"}>更新时间: {apiDoc?.updateTime}</span>
                                    </div>
                                </div>
                            </div>
                            <div id={"share-base-info"} className="header-title ex-title">基本信息</div>
                            <div className={"share-box-right-content-item"}>
                                <div className={"share-box-right-content-item-detail"}>
                                    <div className={"share-detail-title"}>URL:</div>
                                    <MethodType type={apiDoc?.httpApi?.methodType} />
                                    <div>{apiDoc?.httpApi?.path}</div>
                                </div>
                                <div className={"share-box-right-content-item-detail"}>
                                    <div className={"share-detail-title"}>状态:</div>
                                    <div style={{color:` ${apiDoc?.status.color}`}}>{apiDoc?.status.name}</div>
                                </div>
                                <div className={"share-box-right-content-item-detail"}>
                                    <div className={"share-detail-title"}>ContentType: </div>
                                    <div>{showContentType(apiDoc?.httpApi)}</div>
                                </div>
                                <div className={"share-box-right-content-item-detail"}>
                                    {
                                        apiDoc?.httpApi?.desc
                                            ?
                                            <>
                                                <div className={"share-detail-title"}>说明:</div>
                                                <MethodType type={apiDoc?.httpApi?.desc} />
                                            </>
                                            : null
                                    }
                                </div>
                            </div>
                            <div
                                id="share-request-info"
                                className="header-title ex-title">
                                请求参数
                            </div>
                            <div className={"share-box-right-content-item"}>
                                <TableHeaderDoc dataSource={apiDoc?.httpApi?.headerList}/>
                                <TableQueryDoc dataSource={apiDoc?.httpApi?.queryList}/>
                                <RequestBodyDoc data={apiDoc?.httpApi}/>

                            </div>
                            <div  id={"share-response-info"} className="header-title ex-title">响应示例</div>
                        </div>
                        <div className={"share-anchor"}>
                            <div className={"share-anchor-box"}>
                                {
                                    anchor(anchorItem)
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default inject("shareStore")(observer(ApiDoc));