import React, {useEffect, useState} from 'react';
import './homestyle.scss';
import {getUser} from "doublekit-core-ui"
import {inject, observer} from "mobx-react";
import {WorkspaceRecent} from "../workspace";
import WorkspaceWidget from "../workspaceWidget/components/workspaceWidget";
import WorkspaceRecentHome from "../workspace/components/workspaceRecentHome";

// 首页
const Home =(props)=> {
    // const {workspaceStore} = props;
    // const {findWorkspaceHomeTotal} = workspaceStore;

    const userName = getUser().name;
    // const userId = getUser().userId

    const listItem = [
        {
            title:"空间",
            icon:"icon-modular",
            key:"/workspacePage/create"
        },
        // {
        //     title:"快捷测试",
        //     icon:"icon-modular",
        //     key:"/workspace/quicktest"
        // }
    ]

    // const [total, setTotal] = useState();
    //
    // useEffect(()=>{
    //     findWorkspaceHomeTotal(userId).then(res=>{
    //         setTotal(res)
    //     })
    // },[])

    const showListItem = (data) =>{
        return data&&data.map(item=>{
            return (
                <div key={item.key} onClick={()=>toPage(item.key)} className={"home-detail-list-li"}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref= {`#${item.icon}`} />
                    </svg>
                    <span>{item.title}</span>
                </div>
            )
        })
    }

    const toPage = (router) =>{
        props.history.push(router)
        localStorage.setItem("LEFT_NAV_SELECTED",router)
    }




    return(
        <div className={"home-content"}>
            <div className={"home-content-box"}>
                <div>
                    <h1>{userName}</h1>
                </div>
                <div className={"home-detail-box"}>
                    <div className={"home-detail-left"}>
                        <div className={" home-detail-left-menu"}>
                            {showListItem(listItem)}
                        </div>
                        <div>
                            <div className={"home-title"}>帮助</div>
                            <div  className={"home-detail-left-help"}>
                                <div  className={"home-help-item"} >
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-modular`} />
                                    </svg>
                                    <a href={"http://homes.test.doublekit.net"} target={"_blank"}>官网</a>
                                </div>
                                <div className={"home-help-item"} >
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-modular`} />
                                    </svg>
                                    <a href={"http://homes.test.doublekit.net"} target={"_blank"}>帮助文档</a>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"home-detail-right"}>
                        <div className={"home-detail-right-top"}>
                            <div className={"home-detail-right-top-begin"}>
                                <div className={"home-title"}>开始</div>
                                <div className={"home-detail-right-top-begin-detail home-item-box"}>
                                    <div className={"home"}>先创建空间</div>
                                    <div>再开始之前先创建空间</div>
                                    <div
                                        onClick={()=>toPage("/workspaceinit")}
                                        className={"home-begin-start"}
                                    >
                                        前往创建
                                    </div>
                                </div>
                            </div>

                            <div className={"home-detail-right-top-workspace"}>
                                <div className={"home-title"}>空间</div>
                                <WorkspaceWidget {...props}/>
                            </div>
                        </div>
                        <div>
                            <div className={"home-title"}>最近访问的空间</div>

                            <WorkspaceRecentHome />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject("workspaceStore")(observer(Home));
