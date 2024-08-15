import React, {useEffect, useState} from "react";
import { observer} from "mobx-react";
import ProtocolType from "../../../../common/ProtocolType";
import MethodType from "../../../../common/MethodType";
import TableHeaderDoc from "../../common/apiDoc/TableHeaderDoc";
import TableQueryDoc from "../../common/apiDoc/TableQueryDoc";
import RequestBodyDoc from "../../common/apiDoc/RequestBodyDoc";
import ResponseResultDoc from "../../common/apiDoc/ResponseResultDoc";
import {Spin, Tag, Tooltip} from "antd";
import apxMethodStore from "../store/ApxMethodStore";
import copyMockUrl from "../../../../common/copyLink";
import IconCommon from "../../../../common/IconCommon";
import {useParams} from "react-router";
/**
 * 接口文档页面
 */
const ApiDocumentPage = ({tabKey}) =>{
    const { findApxMethod,findServerUrl } = apxMethodStore;
    const [apiDoc, setApiDoc] = useState();

    const [serverUrl, setServerUrl] = useState();
    const {id} = useParams()
    const apiId = localStorage.getItem('apiId')||id;
    const workspaceId = localStorage.getItem("workspaceId")
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(async ()=>{
        if(tabKey==="document"){
            setLoading(true)
            let res = await findApxMethod(apiId);
            setApiDoc(res)
            setLoading(false)
        }
    },[apiId,tabKey])

    useEffect(async ()=>{
        let url = await findServerUrl()
        setServerUrl(url)
    },[])

    return (
        <Spin spinning={loading}>
            <div className={"share-box-right-content-item"}>
                <div className={"share-box-right-content-item-detail"}>
                    {/*<ProtocolType type={apiDoc?.apix?.protocolType}/>*/}

                    <MethodType type={apiDoc?.node?.methodType} />
                    <div>{apiDoc?.apix?.path}</div>
                    <div className={"status-box"}>
                        {apiDoc?.apix?.status?.name}
                    </div>
                </div>

            </div>

            <div className={"share-box-right-content-item"}  >
                <div className={"share-box-right-content-item-detail"}>
                    <div>
                        <span className={"share-detail-title"}>负责人: {apiDoc?.apix?.executor?.name||"未设置"}</span>
                    </div>
                    <div style={{margin:"0 50px"}}>
                        <span className={"share-detail-title"}>更新时间: {apiDoc?.node?.updateTime}</span>
                    </div>
                    {
                        apiDoc?.apix?.desc
                            ?<span className={"share-detail-title"} style={{display:"flex",alignItems:"center"}}>
                             <IconCommon
                                 icon={`${visible?"zhankai":"jiantou-shang2"}`}
                                 onClick={()=>setVisible(!visible)}
                                 className={"icon-s"}
                                 style={{cursor:"pointer"}}
                             />
                        </span>
                            :null
                    }

                </div>

                <div className={"share-box-right-content-item-detail"}>
                    {
                        apiDoc?.apix?.desc&&visible
                            ?
                            <>
                                <div className={"share-detail-title"}>说明:</div>
                                <div >{apiDoc?.apix?.desc}</div>
                            </>
                            : null
                    }
                </div>
            </div>

            <div className={"component-box"}>
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
            </div>
            <div className={"component-box"}>
                <div className="header-title ex-title">响应示例</div>
                {
                    apiDoc?.responseHeaderList
                        ? <div className={"share-box-right-content-item"}><TableHeaderDoc isResponse={true} dataSource={apiDoc?.responseHeaderList} /></div>
                        :null
                }
                {
                    apiDoc?.responseResultList
                        ?  <div className={"share-box-right-content-item"}><ResponseResultDoc dataSource={ apiDoc?.responseResultList} /> </div>
                        :<div>暂无响应示例</div>
                }

            </div>
            <div className="header-title ex-title">MOCK 地址</div>
            <div style={{margin: "5px 0 20px 0"}}>
                <Tooltip title="点击复制">
                    <span
                        id={"link"}
                        onClick={()=>copyMockUrl("link")}
                    >
                        {`${serverUrl}/mockx/`+workspaceId}
                    </span>
                </Tooltip>
            </div>

        </Spin>
    );

}

export default observer(ApiDocumentPage);