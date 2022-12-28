import React from "react";
import {renderRoutes} from "react-router-config";
import "./accmemberStyle.scss"
import {ApiOutlined} from "@ant-design/icons";
import SideMenu from "../../integration/workspaceSetting/sideMenu";



const AccountMember = (props) =>{
    const routers = props.route.routes

    const items=[
        {
            title: '组织管理',
            key: '/accountMember/org',
            icon: 'icon-modular',
        },{
            title: '用户管理',
            key: '/accountMember/user',
            icon: 'icon-modular',
        },{
            title: '目录管理',
            key: '/accountMember/authConfig',
            icon: 'icon-modular',
        },
    ]


    return(
        <div className={"account-member"}>
            <SideMenu
                item={items}
                selectedKey={"/accountMember/org"}
                {...props}
            />

            <div className={"account-member-right"}>
                {renderRoutes(routers)}
            </div>
        </div>
    )
}

export default AccountMember;
