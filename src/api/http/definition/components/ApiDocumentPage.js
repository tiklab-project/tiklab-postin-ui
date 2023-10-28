import React, {useEffect, useState} from "react";
import { observer} from "mobx-react";
import ProtocolType from "../../../../common/ProtocolType";
import MethodType from "../../../../common/MethodType";
import TableHeaderDoc from "../../common/apiDoc/TableHeaderDoc";
import TableQueryDoc from "../../common/apiDoc/TableQueryDoc";
import RequestBodyDoc from "../../common/apiDoc/RequestBodyDoc";
import ResponseResultDoc from "../../common/apiDoc/ResponseResultDoc";
import {Tag, Tooltip} from "antd";
import apxMethodStore from "../store/ApxMethodStore";
import copyMockUrl from "../../../../common/copyLink";
/**
 * 接口文档页面
 */
const ApiDocumentPage = (props) =>{
    const { findApxMethod,findServerUrl } = apxMethodStore;
    const [apiDoc, setApiDoc] = useState();

    const [serverUrl, setServerUrl] = useState();
    const apiId = localStorage.getItem('apiId');
    const workspaceId = localStorage.getItem("workspaceId")

    useEffect(async ()=>{
        let res = await findApxMethod(apiId);
        setApiDoc(res)
    },[apiId])

    useEffect(async ()=>{
        let url = await findServerUrl()
        setServerUrl(url)
    },[])

    return (
        <div className={"content-margin"} style={{padding:"0",  height: "calc(100% - 54px)"}}>
            <div className="content-margin-box">
                <div className={"share-box-right-content-item"}  >
                    <div className={"pi-box-between"}>
                        <div className={"share-box-api-title"}>
                            {apiDoc?.apix?.name}
                            <Tag color={apiDoc?.apix?.status?.color} style={{margin:"0 10px"}}>{apiDoc?.apix?.status?.name}</Tag>
                        </div>

                    </div>

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
                        <div>{apiDoc?.apix?.path}</div>
                    </div>
                    {/*<div className={"share-box-right-content-item-detail"}>*/}
                    {/*    <div className={"share-detail-title"}>状态:</div>*/}
                    {/*    <div style={{color:` ${apiDoc?.apiRecent?.status?.color}`}}>{apiDoc?.apiRecent?.status?.name}</div>*/}
                    {/*</div>*/}
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
                <div className="header-title ex-title">
                    请求参数
                </div>
                <div className={"share-box-right-content-item"}>
                    {
                        apiDoc?.headerList||apiDoc?.queryList||apiDoc?.request?.bodyType!=="none"
                            ?<>
                                <TableHeaderDoc dataSource={apiDoc?.headerList}/>
                                <TableQueryDoc dataSource={apiDoc?.queryList}/>
                                <RequestBodyDoc dataSource={apiDoc}/>
                            </>
                            :<div>暂无请求信息</div>
                    }

                </div>
                <div className="header-title ex-title">响应示例</div>
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
                <div className="header-title ex-title">MOCK 地址</div>
                <div style={{margin: "5px 0 30px 0"}}>
                    <Tooltip title="点击复制">
                        <span
                            id={"link"}
                            onClick={()=>copyMockUrl("link")}
                        >
                            {`${serverUrl}/mockx/`+workspaceId}
                        </span>
                    </Tooltip>
                </div>
            </div>
        </div>
    );

}

export default observer(ApiDocumentPage);