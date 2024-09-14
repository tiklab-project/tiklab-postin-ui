import React from "react";
import { observer} from "mobx-react";
import TableHeaderDoc from "../../../api/http/common/apiDoc/TableHeaderDoc";
import TableQueryDoc from "../../../api/http/common/apiDoc/TableQueryDoc";
import RequestBodyDoc from "../../../api/http/common/apiDoc/RequestBodyDoc";


/**
 * 接口文档页面
 */
const WSDocContent = (props) =>{
    const {wsData,style} = props

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
        }
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


    return (
        <div style={style} id={"share-right-content"} >
            <div className={"share-box-right-detail-content"}  id="share-base-info" style={{padding:"0 10px 0 0"}} >
                <div>
                    <div className={"share-box-right-content-item"}  >
                        <div className={"share-box-api-title"}>{wsData?.node?.name}</div>
                        <div className={"share-box-right-content-item-detail"}>
                            <span style={{color:"white",background: "rgb(46 167 255)"}} className={"requestType"}>{wsData?.apix?.protocolType.toUpperCase()}</span>
                            <div>{wsData?.apix?.path}</div>
                        </div>
                        <div className={"share-box-right-content-item-detail"}>
                            <div>
                                <span className={"share-detail-title"}>负责人: {wsData?.apix?.executor?.name||"未设置"}</span>
                            </div>
                            <div style={{margin:"0 50px"}}>
                                <span className={"share-detail-title"}>更新时间: {wsData?.node?.updateTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"share-box-right-content-item"}>
                        <div className={"share-box-right-content-item-detail"}>
                            {
                                wsData?.apix?.desc
                                    ?
                                    <>
                                        <div className={"share-detail-title"}>说明:</div>
                                        <div >{wsData?.apix?.desc}</div>
                                    </>
                                    : null
                            }
                        </div>
                    </div>
                    <div className="header-title ex-title">
                        请求参数
                    </div>
                    <div className={"share-box-right-content-item"}>
                        <TableHeaderDoc dataSource={wsData?.headerList}/>
                        <TableQueryDoc dataSource={wsData?.queryList}/>
                        <RequestBodyDoc dataSource={wsData} protocolType={wsData?.apix?.protocolType}/>
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
    );

}

export default observer(WSDocContent);