import React from "react";
import MethodType from "../MethodType";
import TableHeaderDoc from "./TableHeaderDoc";
import TableQueryDoc from "./TableQueryDoc";
import RequestBodyDoc from "./RequestBodyDoc";
import ResponseResultDoc from "./ResponseResultDoc";
import ProtocolType from "../ProtocolType";

const DocContent = (props) =>{
    const {apiDoc,style} = props;

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
        <div style={style} id={"share-right-content"} >
            <div className={"share-box-right-detail-content"}  id="share-base-info" style={{padding:"0 10px 0 0"}} >
                <div style={{width:"860px"}}>
                    <div className={"share-box-right-content-item"}  >
                        <div className={"share-box-api-title"}>{apiDoc?.apix?.name}</div>
                        <div className={"share-box-right-content-item-detail"}>
                            <div>
                                <span className={"share-detail-title"}>负责人: {apiDoc?.apix?.executor?.name||"未设置"}</span>
                            </div>
                            <div>
                                <span className={"share-detail-title"}>更新时间: {apiDoc?.apix?.updateTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className={"share-box-right-content-item"}>
                        <div className={"share-box-right-content-item-detail"}>
                            <ProtocolType type={apiDoc?.apix?.protocolType}/>
                            <MethodType type={apiDoc?.methodType} />
                            <div>{apiDoc?.path}</div>
                        </div>
                        <div className={"share-box-right-content-item-detail"}>
                            <div className={"share-detail-title"}>状态:</div>
                            <div style={{color:` ${apiDoc?.apix?.status?.color}`}}>{apiDoc?.apix?.status?.name}</div>
                        </div>
                        <div className={"share-box-right-content-item-detail"}>
                            {
                                apiDoc?.apix?.desc
                                    ?
                                    <>
                                        <div className={"share-detail-title"}>说明:</div>
                                        <div >{apiDoc?.apix?.desc}</div>
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
                        {
                            apiDoc?.headerList||apiDoc?.queryList||apiDoc?.request?.bodyType!=="none"
                                ?<>
                                    <TableHeaderDoc dataSource={apiDoc?.headerList}/>
                                    <TableQueryDoc dataSource={apiDoc?.queryList}/>
                                    <RequestBodyDoc data={apiDoc}/>
                                </>
                                :<div>暂无请求信息</div>
                        }

                    </div>
                    <div  id={"share-response-info"} className="header-title ex-title">响应示例</div>
                    <div className={"share-box-right-content-item"}>
                        {
                            apiDoc?.responseHeaderList
                                ? <TableHeaderDoc isResponse={true} dataSource={apiDoc?.responseHeaderList} />
                                :null
                        }
                    </div>
                    <div className={"share-box-right-content-item"}>
                        {
                            apiDoc?.responseResultList
                                ? <ResponseResultDoc dataSource={ apiDoc?.responseResultList} />
                                :<div>暂无响应示例</div>
                        }
                    </div>
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
    )
}

export default DocContent;