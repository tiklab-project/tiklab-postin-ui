import React, {useEffect, useState} from "react";
import { observer} from "mobx-react";
import wsStore from "../../ws/store/WSStore";
import {Tag} from "antd";
import TableHeaderDoc from "../../../http/common/apiDoc/TableHeaderDoc";
import TableQueryDoc from "../../../http/common/apiDoc/TableQueryDoc";
import RequestBodyDoc from "../../../http/common/apiDoc/RequestBodyDoc";
/**
 * 接口文档页面
 */
const WSDocumentPage = (props) =>{
    const {findWSApi} = wsStore
    
    const apiId = localStorage.getItem('apiId');
    const [wsInfo, setWsInfo] = useState();

    useEffect(async ()=>{
        let info =  await findWSApi(apiId)
        setWsInfo(info)
    },[apiId])


    return (
        <div className={"content-margin page-padding"} style={{height: "calc(100% - 50px)"}}>
            <div className="content-margin-box">
                <div className={"share-box-right-content-item"}  >
                    <div className={"pi-box-between"}>
                        <div className={"share-box-api-title"}>
                            {wsInfo?.apix?.name}
                            <Tag color={wsInfo?.apix?.status?.color} style={{margin:"0 10px"}}>{wsInfo?.apix?.status?.name}</Tag>
                        </div>

                    </div>

                    <div className={"share-box-right-content-item-detail"}>
                        <div>
                            <span className={"share-detail-title"}>负责人: {wsInfo?.apix?.executor?.name||"未设置"}</span>
                        </div>
                        <div>
                            <span className={"share-detail-title"}>更新时间: {wsInfo?.apix?.updateTime}</span>
                        </div>
                    </div>
                </div>

                <div className={"share-box-right-content-item"}>
                    <div className={"share-box-right-content-item-detail"}>
                        <span style={{color:"white",background: "rgb(46 167 255)"}} className={"requestType"}>{wsInfo?.apix?.protocolType.toUpperCase()}</span>
                        <div>{wsInfo?.apix?.path}</div>
                    </div>
                    <div className={"share-box-right-content-item-detail"}>
                        {
                            wsInfo?.apix?.desc
                                ?
                                <>
                                    <div className={"share-detail-title"}>说明:</div>
                                    <div >{wsInfo?.apix?.desc}</div>
                                </>
                                : null
                        }
                    </div>
                </div>
                <div className="header-title ex-title">
                    请求参数
                </div>
                <div className={"share-box-right-content-item"}>
                    <TableHeaderDoc dataSource={wsInfo?.headerList}/>
                    <TableQueryDoc dataSource={wsInfo?.queryList}/>
                    <RequestBodyDoc dataSource={wsInfo} protocolType={wsInfo?.apix?.protocolType}/>
                </div>
                
                
            </div>
        </div>
    );

}

export default observer(WSDocumentPage);