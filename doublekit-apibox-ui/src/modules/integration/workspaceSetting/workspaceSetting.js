import {renderRoutes} from "react-router-config";
import {Menu} from "antd";
import React from "react";
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
            title: '环境管理',
            key: '/workspacepage/workspaceSetting/envMana',
            icon: 'icon-modular',
        },{
            title: '状态管理',
            key: '/workspacepage/workspaceSetting/apistatus',
            icon: 'icon-modular',
        },{
            title: '空间成员',
            key: '/workspacepage/workspaceSetting/role',
            icon: 'icon-modular',
        },{
            title: '空间权限',
            key: '/workspacepage/workspaceSetting/workspacePrivilege',
            icon: 'icon-modular',
        }
    ]



    return(
        <div className={"workspace-setting-box"}>
            <SideMenu
                item={items}
                selectedKey={"/workspacepage/workspaceSetting/envMana"}
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