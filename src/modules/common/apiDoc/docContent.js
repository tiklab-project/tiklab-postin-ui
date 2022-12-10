import React from "react";
import MethodType from "../methodType";
import TableHeaderDoc from "./tableHeaderDoc";
import TableQueryDoc from "./tableQueryDoc";
import RequestBodyDoc from "./requestBodyDoc";
import ResponseResultDoc from "./responseResultDoc";

const DocContent = (props) =>{
    const {apiDoc,style} = props;

    const showContentType =(data)=>{
        switch (data?.request?.bodyType) {
            case "none":
                return "none"
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
        <div style={style}>
            <div className={"share-box-right-detail-content"} style={{width:" 860px"}}>
                <div className={"share-box-right-content-item"}>
                    <div className={"share-box-api-title"}>{apiDoc?.apix?.name}</div>
                    <div className={"share-box-right-content-item-detail"}>
                        <div>
                            <span className={"share-detail-title"}>负责人: {apiDoc?.apix?.executor?.name||"孙现诚"}</span>
                        </div>
                        <div>
                            <span className={"share-detail-title"}>更新时间: {apiDoc?.apix?.updateTime}</span>
                        </div>
                    </div>
                </div>
                <div id={"share-base-info"} className="header-title ex-title">基本信息</div>
                <div className={"share-box-right-content-item"}>
                    <div className={"share-box-right-content-item-detail"}>
                        <div className={"share-detail-title"}>URL:</div>
                        <MethodType type={apiDoc?.methodType} />
                        <div>{apiDoc?.path}</div>
                    </div>
                    <div className={"share-box-right-content-item-detail"}>
                        <div className={"share-detail-title"}>状态:</div>
                        <div style={{color:` ${apiDoc?.apix?.status?.color}`}}>{apiDoc?.apix?.status?.name}</div>
                    </div>
                    <div className={"share-box-right-content-item-detail"}>
                        <div className={"share-detail-title"}>ContentType: </div>
                        <div>{showContentType(apiDoc)}</div>
                    </div>
                    <div className={"share-box-right-content-item-detail"}>
                        {
                            apiDoc?.apix?.desc
                                ?
                                <>
                                    <div className={"share-detail-title"}>说明:</div>
                                    <MethodType type={apiDoc?.apix?.desc} />
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
                            :null
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
    )
}

export default DocContent;