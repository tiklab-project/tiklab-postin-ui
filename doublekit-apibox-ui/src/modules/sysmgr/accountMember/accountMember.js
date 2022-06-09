import React from "react";
import {Menu} from "antd";
import {renderRoutes} from "react-router-config";
import "./accmemberStyle.scss"

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const AccountMember = (props) =>{
    const routers = props.route.routes

    const toPage=(router)=>{
        props.history.push(router)
    }

    const items = [
        getItem(
            <div className={"account-member-left-li"} onClick={()=>toPage("/accountMember/org")}>组织管理</div>,
            "org",
            null,
        ),
        getItem(
            <div className={"account-member-left-li"} onClick={()=>toPage("/accountMember/user")}>用户管理</div>,
            "user",
            null,
        ),
        getItem(
            <div className={"account-member-left-li"} onClick={()=>toPage("/accountMember/authConfig")}>目录管理</div>,
            "authConfig",
            null,
        )
    ]

    return(
        <div className={"account-member"}>
            <div className={"account-member-left"}>
                <Menu
                    style={{
                        width: 256,
                        height:"100%"
                    }}
                    defaultSelectedKeys={['org']}
                    theme={"light"}
                    items={items}
                />
            </div>
            <div className={"account-member-right"}>
                {renderRoutes(routers)}
            </div>
        </div>
    )
}

export default AccountMember;