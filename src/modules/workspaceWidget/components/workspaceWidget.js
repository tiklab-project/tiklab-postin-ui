import React, {useEffect, useState} from "react";
import {getUser} from "tiklab-core-ui";
import "./widgetStyle.scss"

import {findWorkspaceHomeTotal} from "../api/widgetApi"

const WorkspaceWidget = (props) =>{
    const {apiUrl,webUrl} = props;

    const userId = getUser().userId

    const [total, setTotal] = useState();

    useEffect(()=>{
        let param = new FormData();
        param.append("userId",userId)

        if(apiUrl){
            findWorkspaceHomeTotal(param,apiUrl).then(res=>{
                setTotal(res.data)
            })
        }else {
            findWorkspaceHomeTotal(param).then(res=>{
                setTotal(res.data)
            })
        }

    },[])

    const toPage = (router) =>{
        props.history.push(router)
        localStorage.setItem("LEFT_NAV_SELECTED",router)
    }

    let item = [
        {
            title:"空间总数",
            key:"/workspacePage/all",
            total:total?.allTotal
        },{
            title:"我创建的",
            key:"/workspacePage/create",
            total:total?.createTotal
        },{
            title:"我参与的",
            key:"/workspacePage/join",
            total:total?.joinTotal
        },{
            title:"我关注的",
            key:"/workspacePage/follow",
            total:total?.followTotal
        }
    ]

    const showItem = (data) =>{
        return data&&data.map(item=>{
            return(
                <div className={"home-item"} key={item.key}>
                    {
                        webUrl
                            ?
                            <a className={"home-item-total"} href={`${webUrl}/#${item.key}`} target={"_blank"}>{item.total}</a>
                            :
                            <div
                                className={"home-item-total"}
                                onClick={()=>toPage(item.key)}
                                >
                                {item.total}
                            </div>
                    }


                    <div className={"home-item-name"}>{item.title}</div>
                </div>
            )
        })
    }

    return(
        <div className={"home-detail-right-top-workspace-detail  home-item-box"}>
            {showItem(item)}
        </div>
    )
}
export default WorkspaceWidget;