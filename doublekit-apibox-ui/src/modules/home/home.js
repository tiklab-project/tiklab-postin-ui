import React, {useEffect} from 'react';
import './homestyle.scss';
import {getUser} from "doublekit-core-ui"
import {Table} from "antd";
import {inject, observer} from "mobx-react";
import {globalTabListInit} from "../common/globalSharing";
import {WorkspaceRecent} from "../workspace";

// 首页
const Home =(props)=> {

    const userName = getUser().name;

    const listItem = [
        {
            title:"空间",
            icon:"icon-modular",
            key:"/workspace/alllist"
        },
        {
            title:"快捷测试",
            icon:"icon-modular",
            key:"/workspace/quicktest"
        }
    ]

    const toPage = (router) =>{
        props.history.push(router)
    }

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
                                        onClick={()=>toPage("/workspaceinitpage")}
                                        className={"home-begin-start"}
                                    >
                                        前往创建
                                    </div>
                                </div>
                            </div>
                            <div className={"home-detail-right-top-workspace"}>
                                <div className={"home-title"}>空间</div>
                                <div className={"home-detail-right-top-workspace-detail  home-item-box"}>
                                    <div className={"home-item"}>
                                        <div className={"home-item-total"}>5</div>
                                        <div className={"home-item-name"}>空间总数</div>
                                    </div>
                                    <div className={"home-item"}>
                                        <div className={"home-item-total"}>3</div>
                                        <div className={"home-item-name"}>我创建的</div>
                                    </div>
                                    <div className={"home-item"}>
                                        <div className={"home-item-total"}>2</div>
                                        <div className={"home-item-name"}>我参与的</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={"home-title"}>最近访问的空间</div>

                            <WorkspaceRecent {...props}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
