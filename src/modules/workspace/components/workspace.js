
import React, { Fragment, useState } from 'react';
import { renderRoutes } from "react-router-config";
import './workspace.scss';
import BreadcrumbEx from "../../common/breadcrumbEx";
import {Input, Space} from "antd";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import WorkspaceEdit from "./workspaceEdit";


const Workspace = (props) => {
    const {workspaceStore} = props;

    const {selectedItem,menuSelected} = workspaceStore;

    const userId = getUser().userId;
    const router = props.route.routes;

    //空间列表左侧导航列表
    const items = [
        {
            title: '我创建的空间',
            key: `create`,
            router:"/workspacePage/create"
        },{
            title: '我参与的空间',
            key: `join`,
            router:"/workspacePage/join"
        },{
            title: `最近浏览`,
            key: `recent`,
            router:"/workspacePage/recent"
        },{
            title: '我关注的空间',
            key: `follow`,
            router:"/workspacePage/follow"
        },{
            title: '所有空间',
            key: `all`,
            router:"/workspacePage/all"
        }
    ];


    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`ws-header-menu-item  ${item.key === selectedItem ? "ws-header-menu-item-selected" : ""}`}
                    onClick={()=>selectKeyFun(item)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }

    const selectKeyFun = (item)=>{
        menuSelected(item.key)
        props.history.push(item.router);
    }

    const onSearch = (e) =>{
        switch (selectedItem) {
            case "all":
                // findwsList({name:e.target.value})
                break;
            case "create":
                // let param = {
                //     userId:userId,
                //     name:e.target.value
                // }
                // findwsList(param)
                break;
            case "join":
                break;
            case "recent":
                break;
            case "follow":
                break;
        }

    }

    const rightContent = () =>{
        return(
            <Space>
                <Input
                    placeholder={`搜索空间`}
                    onPressEnter={onSearch}
                />
                <WorkspaceEdit
                    name={"添加空间"}
                    btn={"btn"}
                    userId={userId}
                    {...props}
                />
            </Space>
        )
    }


    return(
        // <Fragment>
        //     <div className="ws-layout">
        //         <SideMenu
        //             item={items}
        //             selectedKey={"/workspacePage/create"}
        //             {...props}
        //         />
        //
        //         <div className='ws-content'>
        //             <div className="ws-content-box">
        //                 {renderRoutes(router)}
        //             </div>
        //         </div>
        //     </div>
        // </Fragment>
        <div className='ws-layout'>
            <BreadcrumbEx list={["主页","空间"]} />
            <div className={"ws-header-menu"}>
                <div className={"ws-header-menu-left"}>{showMenu(items)}</div>
                <>{rightContent()}</>
            </div>

            <div className='contant-box'>
                {renderRoutes(router)}
            </div>
        </div>
    )
}

export default inject("workspaceStore")(observer(Workspace));
