import React, {useEffect, useState} from "react";
import { observer} from "mobx-react";
import wsStore from "../../ws/store/WSStore";
import {Tag} from "antd";
import TableHeaderDoc from "../../../http/common/apiDoc/TableHeaderDoc";
import TableQueryDoc from "../../../http/common/apiDoc/TableQueryDoc";
import RequestBodyDoc from "../../../http/common/apiDoc/RequestBodyDoc";
import IconCommon from "../../../../common/IconCommon";
/**
 * 接口文档页面
 */
const WSDocumentPage = (props) =>{
    const {findWSApi} = wsStore
    
    const apiId = localStorage.getItem('apiId');
    const [wsInfo, setWsInfo] = useState();
    const [visible, setVisible] = useState(false);

    useEffect(async ()=>{
        let info =  await findWSApi(apiId)
        setWsInfo(info)
    },[apiId])


    return (
        <>
            <div className={"share-box-right-content-item"}  >
                <div className={"share-box-right-content-item-detail"}>
                    <span style={{color:"white",background: "rgb(46 167 255)"}} className={"requestType"}>{wsInfo?.apix?.protocolType.toUpperCase()}</span>
                    <div>{wsInfo?.apix?.path}</div>
                </div>
                <div className={"share-box-right-content-item-detail"}>
                    <div>
                        <span className={"share-detail-title"}>负责人: {wsInfo?.apix?.executor?.name||"未设置"}</span>
                    </div>
                    <div style={{margin:"0 50px"}}>
                        <span className={"share-detail-title"}>更新时间: {wsInfo?.node?.updateTime}</span>
                    </div>
                    {
                        wsInfo?.apix?.desc
                        ?<span className={"share-detail-title"} style={{display:"flex",alignItems:"center"}}>
                            <span>更多 :  </span>
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
            </div>
            <div className={"share-box-right-content-item"}>
                <div className={"share-box-right-content-item-detail"}>
                    {
                        wsInfo?.apix?.desc&&visible
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
                {
                    wsInfo?.headerList||wsInfo?.queryList||wsInfo?.jsonParam?.jsonText||wsInfo?.rawParam?.rawText
                        ?<>
                            <TableHeaderDoc dataSource={wsInfo?.headerList}/>
                            <TableQueryDoc dataSource={wsInfo?.queryList}/>
                            <RequestBodyDoc dataSource={wsInfo} protocolType={wsInfo?.apix?.protocolType}/>
                        </>
                        :<div style={{margin:"10px 0"}}>暂无请求信息</div>
                }

            </div>


        </>
    );

}

export default observer(WSDocumentPage);