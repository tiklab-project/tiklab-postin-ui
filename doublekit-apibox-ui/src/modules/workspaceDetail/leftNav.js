import React, {useState} from "react";
import Avatar from "antd/es/avatar/avatar";
import {UserOutlined} from "@ant-design/icons";

const LeftNav = (props) =>{
    const menuData = [

        {
            "icon":"jiekou",
            "name":"API",
            "key":"api",
            "router":"/workspacepage/apis"
        },{
            "icon":"kuaijieyingyon",
            "name":"快捷测试",
            "key":"quickTest",
            "router":"/workspacepage/quickTest"
        },
        {
            "icon":"jiekou",
            "name":"数据结构",
            "key":"dataStructure",
            "router":"/workspacepage/dataStructure"
        },
        {
            "icon":"quanxian",
            "name":"空间设置",
            "key":"workspaceSetting",
            "router":"/workspacepage/workspaceSetting"
        },
    ]

    const workspaceId = localStorage.getItem("workspaceId")
    const leftMenuSelect = localStorage.getItem("LEFT_MENU_SELECT")

    const clickAddRouter = (data) =>{

        addApiTabInfo(data.router);

        addQuickTestTabInfo(data.router);

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT",data.key);

        props.history.push(data.router)
    }

    //点击api按钮时初始化api中tab页信息
    const addApiTabInfo = (router) => {
        if(router==="/workspacepage/apis"){
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
        if(router==="/workspacepage/quickTest"){
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

    return(
        <>
            {/*<div className={"ws-detail-left-nav-ws "}>*/}
            {/*    <Avatar icon={<UserOutlined />} />*/}
            {/*</div>*/}
            <ul className={"ws-detail-left-nav"}>
                {
                    showMenuItem(menuData)
                }
            </ul>
        </>
    )
}

export default LeftNav;
