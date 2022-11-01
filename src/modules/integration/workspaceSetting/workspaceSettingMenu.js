import React from "react";
import {renderRoutes} from "react-router-config";
import "./workspaceSetting.scss"
import SideMenu from "../../common/sideMenu";
import {inject, observer} from "mobx-react";


const WorkspaceSettingMenu = (props) =>{
    const { workspaceStore} = props;
    const {settingItemSelected} = workspaceStore;
    const routes = props.route.routes;

    const items=[
        {
            title: '空间设置',
            key: '/workspace/setting/detail',
            icon: 'icon-setting',
        },{
            title: '空间成员',
            key: '/workspace/setting/role',
            icon: 'icon-modular',
        },{
            title: '空间权限',
            key: '/workspace/setting/privilege',
            icon: 'icon-modular',
        }
    ]


    return(
        <div className={"workspace-setting-box"}>
            <SideMenu
                item={items}
                selectedKey={settingItemSelected?settingItemSelected:"/workspace/setting/detail"}
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


export default inject("workspaceStore")(observer(WorkspaceSettingMenu));