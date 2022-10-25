import React from "react";
import {renderRoutes} from "react-router-config";
import "./workspaceSetting.scss"
import SideMenu from "../../common/sideMenu";


const WorkspaceSettingMenu = (props) =>{

    const routes = props.route.routes;

    const items=[
        {
            title: '空间成员',
            key: '/workspace/setting/role',
            icon: 'icon-modular',
        },{
            title: '空间权限',
            key: '/workspace/setting/privilege',
            icon: 'icon-modular',
        },{
            title: '空间设置',
            key: '/workspace/setting/detail',
            icon: 'icon-setting',
        }
    ]


    return(
        <div className={"workspace-setting-box"}>
            <SideMenu
                item={items}
                selectedKey={"/workspace/setting/role"}
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


export default WorkspaceSettingMenu;