import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import DynamicWidget from "../../home/DynamicWidget";

/**
 * 空间概况
 */
const WorkspaceOverViewPage = (props) =>{
    const {workspaceStore} = props;
    const {findWorkspaceTotal} = workspaceStore;

    const workspaceId =  localStorage.getItem("workspaceId");
    const [total, setTotal] = useState();

    useEffect(async ()=>{
        let res = await findWorkspaceTotal(workspaceId)

        setTotal(res)
    },[workspaceId])

    //概要项
    const items = [
        {
            title:"API总数",
            value:total?.apiTotal,
        },
        {
            title:"分组数",
            value:total?.categoryTotal,
        },
        {
            title:"用例数",
            value:total?.caseTotal,
        },
        {
            title:"数据模型数",
            value:total?.modelTotal,
        },
        {
            title:"成员",
            value:total?.memberTotal,
        }
    ]

    /**
     * 展示概要
     */
    const showDetailView = (data) =>{
        return data.map((item,index)=>{
            return(
                <div className={"wd-total-item"} key={index}>
                    <div className={"wd-total-item-title"}>{item.value}</div>
                    <div className={"wd-total-item-name"}>{item.title}</div>
                </div>
            )
        })
    }

    return(
        <div className={"content-margin"} style={{ background:"var(--pi-bg-grey-100)"}}>
            <div className={" ws-init-content"}>
                <div className={"wd-total"}>
                    <div className={"wd-title"}> 概要</div>
                    <div className={"wd-total-box"}>
                        {
                            showDetailView(items)
                        }
                    </div>
                </div>
                <div className={"wd-dynamic-box"}>
                    <div className={"wd-title"} >动态详情</div>
                    <div style={{margin: "0 10px"}}>
                        <DynamicWidget screen={{"workspaceId": workspaceId}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject("workspaceStore")(observer(WorkspaceOverViewPage));