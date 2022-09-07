import React from "react";
import {renderRoutes} from "react-router-config";
import "./workspaceSetting.scss"
import SideMenu from "../../common/sideMenu";

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

    const items=[
        {
            title: '状态管理',
            key: '/workspace/workspaceSetting/apistatus',
            icon: 'icon-modular',
        },{
            title: '空间成员',
            key: '/workspace/workspaceSetting/role',
            icon: 'icon-modular',
        },{
            title: '空间权限',
            key: '/workspace/workspaceSetting/workspacePrivilege',
            icon: 'icon-modular',
        }
    ]



    return(
        <div className={"workspace-setting-box"}>
            <SideMenu
                item={items}
                selectedKey={"/workspace/workspaceSetting/apistatus"}
                {...props}
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