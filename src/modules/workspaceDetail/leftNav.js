import React, {useEffect, useState} from "react";
import ProxySelect from "../common/request/proxySelect";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {Space} from "antd";
import {toWorkspaceDetail} from "../workspace/components/workspaceFn";

const LeftNav = (props) =>{
    const {workspaceStore,workspaceRecentStore} = props;
    const {workspaceName,workspaceList,findWorkspaceList,settingMenuSelected } = workspaceStore;
    const {workspaceRecent}=workspaceRecentStore;
    const menuData = [

        {
            "icon":"jiekou",
            "name":"API",
            "key":"api",
            "router":"/workspace/apis"
        },{
            "icon":"kuaijieyingyon",
            "name":"快捷测试",
            "key":"quickTest",
            "router":"/workspace/quickTest"
        },
        {
            "icon":"jiekou",
            "name":"数据结构",
            "key":"dataStructure",
            "router":"/workspace/dataStructure"
        },
    ]

    const setting= {
            "icon":"setting",
            "name":"空间设置",
            "key":"workspaceSetting",
            "router":"/workspace/setting"
        }


    const workspaceId = localStorage.getItem("workspaceId")
    const leftMenuSelect = localStorage.getItem("LEFT_MENU_SELECT")

    useEffect(()=>{
        findWorkspaceList({userId:getUser().userId})
    },[])

    const clickAddRouter = (data) =>{

        addApiTabInfo(data.router);

        addQuickTestTabInfo(data.router);

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT",data.key);

        props.history.push(data.router)
    }

    //点击api按钮时初始化api中tab页信息
    const addApiTabInfo = (router) => {
        if(router==="/workspace/apis"){
            const apiTabInfo = {
                activeKey:0,
                tabList:[
                    {
                        name:"初始页",
                        id:workspaceId,
                        type:"list",
                    }
                ]
            }
            sessionStorage.setItem("apiTabListInfo",JSON.stringify(apiTabInfo))
        }
    }

    const addQuickTestTabInfo = (router) =>{
        if(router==="/workspace/quickTest"){
            const apiTabInfo = {
                activeKey:0,
                tabList:[
                    {
                        name:"新标签",
                        id:"newTab",
                        type:"api",
                    }
                ]
            }

            sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(apiTabInfo))

            localStorage.setItem("instanceId","-1")
        }
    }

    const clickWorkspaceIcon = () =>{
        let data = {
            router:"/workspace/apis",
            key:"api"
        }

        clickAddRouter(data);

        settingMenuSelected("/workspace/setting/detail");
    }

    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.key}
                    className={`ws-detail-left-nav-item `}
                    onClick={()=>clickAddRouter(item)}
                >
                    <div className={`ws-detail-left-nav-item-box ${leftMenuSelect===item.key?"selectlink":null}`}>
                        <div className={"ws-detail-left-nav-item-detail"}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-${item.icon}`} />
                            </svg>
                        </div>
                        <div  className={"ws-detail-left-nav-item-detail"}>
                            {item.name}
                        </div>
                    </div>
                </li>
            )
        })
    }

    const showIcon = (text)=>{
        let t = text.substring(0,1).toUpperCase();

        return <div className={"workspace-text-icon-box"}>
            <span>{t}</span>
        </div>
    }

    const showWorkspaceList = (list) =>{
        return list&&list.map(item=>{
            return (
                <div className={"ws-hover-item"} key={item.id} onClick={()=>toggleWorkspace(item.id)}>
                    <Space>
                        {showIcon(item.workspaceName)}
                        {item.workspaceName}
                    </Space>
                </div>
            )
        })
    }



    const toggleWorkspace = (workspaceId)=>{
        toWorkspaceDetail(workspaceId,getUser().userId,workspaceRecent)

        props.history.push('/workspace');
    }

    return(
        <>
            <ul className={"ws-detail-left-nav"}>
                <div>
                    <li
                        className={`ws-detail-left-nav-item-workspace `}
                        onClick={clickWorkspaceIcon}

                    >
                        <div className={"ws-icon-box"}>

                            <span style={{"cursor":"pointer",margin:" 0 0 0 20px"}}>
                                {showIcon(workspaceName)}

                            </span>
                            <svg className="icon" aria-hidden="true"  style={{"cursor":"pointer"}}>
                                <use xlinkHref= {`#icon-xiala`} />
                            </svg>

                            <div className={"ws-hover-box"}>
                                <div className={"ws-hover-box-title"}>
                                    <svg className="icon" aria-hidden="true" >
                                        <use xlinkHref= {`#icon-xiala`} />
                                    </svg>
                                    切换空间
                                </div>
                                {
                                    showWorkspaceList(workspaceList)
                                }
                            </div>
                        </div>

                    </li>
                    {
                        showMenuItem(menuData)
                    }
                </div>
                <div>
                    <ProxySelect />

                    <div className={`ws-detail-left-nav-item`} onClick={()=>clickAddRouter(setting)}>
                        <div className={`ws-detail-left-nav-item-box  ws-detail-left-nav-item-setting`}>
                            <div className={"ws-detail-left-nav-item-detail"}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref= {`#icon-setting`}/>
                                </svg>
                            </div>
                            <div  className={"ws-detail-left-nav-item-detail"} >  设置 </div>
                        </div>
                    </div>
                </div>
            </ul>
        </>
    )
}

export default inject("workspaceStore","workspaceRecentStore")(observer(LeftNav));
