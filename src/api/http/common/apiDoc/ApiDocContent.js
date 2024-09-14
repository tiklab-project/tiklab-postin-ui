import React from "react";
import MethodType from "../../../../common/MethodType";
import TableHeaderDoc from "./TableHeaderDoc";
import TableQueryDoc from "./TableQueryDoc";
import RequestBodyDoc from "./RequestBodyDoc";
import ResponseResultDoc from "./ResponseResultDoc";
import ProtocolType from "../../../../common/ProtocolType";

/**
 * 接口文档公共组件
 */
const ApiDocContent = (props) =>{
    const {apiData,style} = props;

    /**
     * 点击锚点
     */
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

    /**
     * 右侧锚点项
     */
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

    /**
     * 锚点渲染
     */
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
        <div style={style} id={"api-detail-content"} >
            <div className={"share-box-right-detail-content"}  id="share-base-info" style={{padding:"0 10px 0 0"}} >
                <div>
                    <div className={"share-box-right-content-item"}  >
                        <div className={"share-box-api-title"}>{apiData?.node?.name}</div>
                        <div className={"share-box-right-content-item-detail"}>
                            <div>
                                <span className={"share-detail-title"}>负责人: {apiData?.apix?.executor?.name||"未设置"}</span>
                            </div>
                            <div>
                                <span className={"share-detail-title"}>更新时间: {apiData?.apix?.updateTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className={"share-box-right-content-item"}>
                        <div className={"share-box-right-content-item-detail"}>
                            <ProtocolType type={apiData?.apix?.protocolType}/>
                            <MethodType type={apiData?.node?.methodType} />
                            <div>{apiData?.apix?.path}</div>
                        </div>
                        <div className={"share-box-right-content-item-detail"}>
                            <div className={"share-detail-title"}>状态:</div>
                            <div style={{color:` ${apiData?.apix?.status?.color}`}}>{apiData?.apix?.status?.name}</div>
                        </div>
                        <div className={"share-box-right-content-item-detail"}>
                            {
                                apiData?.apix?.desc
                                    ?
                                    <>
                                        <div className={"share-detail-title"}>说明:</div>
                                        <div >{apiData?.apix?.desc}</div>
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
                            apiData?.headerList||apiData?.queryList||apiData?.request?.bodyType!=="none"
                                ?<>
                                    <TableHeaderDoc dataSource={apiData?.headerList}/>
                                    <TableQueryDoc dataSource={apiData?.queryList}/>
                                    <RequestBodyDoc dataSource={apiData}/>
                                </>
                                :<div>暂无请求信息</div>
                        }

                    </div>
                    <div  id={"share-response-info"} className="header-title ex-title">响应示例</div>
                    <div className={"share-box-right-content-item"}>
                        {
                            apiData?.responseHeaderList
                                ? <TableHeaderDoc isResponse={true} dataSource={apiData?.responseHeaderList} />
                                :null
                        }
                    </div>
                    <div className={"share-box-right-content-item"}>
                        {
                            apiData?.responseResultList
                                ? <ResponseResultDoc dataSource={ apiData?.responseResultList} />
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

export default ApiDocContent;