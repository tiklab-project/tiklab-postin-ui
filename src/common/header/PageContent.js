import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";
import {getUser} from "thoughtware-core-ui";
import './portalStyle.scss'
import '../styles/base.scss';
import '../styles/global.scss';
import '../language/i18n';
import "../../assets/iconfont/iconfont";
import "../../assets/iconfont/iconfont.css";
import {inject, observer} from "mobx-react";
import {SYSTEM_ROLE_STORE} from 'thoughtware-privilege-ui/es/store';
import {useHistory} from "react-router";
import LeftMenuCommon from "../LeftMenuCommon/LeftMenuCommon";
import {useMenuExpanded} from "../hooks/useMenuExpanded";

/**
 * 整个页面
 */
const PageContent =(props)=> {
    const router = props.route.routes;

    const user = getUser();
    const history = useHistory()
    const [menuExpanded]  = useMenuExpanded()
    const firstPage = history.location.pathname === "/index" || history.location.pathname === "/workspace"||history.location.pathname === "/workspaceAdd";

    useEffect(()=>{
        //给左侧导航设置一个选择项
        localStorage.setItem("LEFT_MENU_SELECT","/index")
    },[menuExpanded])

    useEffect(() => {
         if (user.userId) {
             props.systemRoleStore.getSystemPermissions(user.userId)
         }
     }, [user])

    const menuData = [
        {
            name:"主页",
            icon: "home",
            key:"home",
            router:"/index"
        },
        {
            name: "空间",
            icon: "xiangmu1",
            key: "workspaces",
            router:"/workspace"
        }
    ]

    const showMainMenu = ()=>{
        if (firstPage) {
             return<LeftMenuCommon
                menuData={menuData}
                isFirst={true}
                settingRouter={`/setting/home`}
                {...props}
            />
        }
    }

    return(
        <>
            <div className={"main-content"} >
                {showMainMenu()}
                <div style={{height:"100%", width:`${firstPage?"calc(100% - 74px)" :"100%"}`}}>

                    {renderRoutes(router)}
                </div>
            </div>
        </>

    )
}

export default inject(SYSTEM_ROLE_STORE,"workspaceStore")(observer(PageContent))
