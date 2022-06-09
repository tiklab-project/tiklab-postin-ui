import {renderRoutes} from "react-router-config";
import {Menu} from "antd";
import React from "react";
import "./workspaceSetting.scss"

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const WorkspaceSetting = (props) =>{
    const routes = props.route.routes;

    const toPage=(router)=>{
        props.history.push(router)
    }

    const items = [
        getItem(
            <div className={"account-member-left-li"} onClick={()=>toPage("/workspacepage/workspaceSetting/envMana")}>环境管理</div>,
            "apistatus",
           null,
        ),
        getItem(
            <div
                className={"account-member-left-li"}
                onClick={()=>toPage("/workspacepage/workspaceSetting/apistatus")}
            >
                状态管理
            </div>,
            "dataStucture",
            null,
        ),
        getItem(
            <div
                className={"account-member-left-li"}
                onClick={()=>toPage("/workspacepage/workspaceSetting/role")}
            >
                空间成员
            </div>,
            "role",
            null,
        ),
        getItem(
            <div
                className={"account-member-left-li"}
                onClick={()=>toPage("/workspacepage/workspaceSetting/workspacePrivilege")}
            >
                空间权限
            </div>,
            "privilege",
            null,
        ),

    ]


    return(
        <div className={"workspace-setting-box"}>
            <Menu
                style={{
                    width: 256,
                    height:"100%"
                }}
                defaultSelectedKeys={['apistatus']}
                theme={"light"}
                items={items}
            />
            <div className={"workspace-setting-right"}>
                {
                    renderRoutes(routes)
                }
            </div>

        </div>
    )
}


export default WorkspaceSetting;