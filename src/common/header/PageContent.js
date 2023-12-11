import React, {useEffect} from "react";
import HeaderContent from "./HeaderContent";
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


/**
 * 整个页面
 */
const PageContent =(props)=> {

    const router = props.route.routes;

     const user = getUser();
     useEffect(() => {
         if (user.userId) {
             props.systemRoleStore.getSystemPermissions(user.userId)
         }
     }, [user])

    /**
     * 头部退出方法跳往退出页
     */
    const Logout = () => {
        props.history.push({
            pathname: "/logout",
            state:{
                preRoute: props.location.pathname
            }
        })
    }


    return(
        <div style={{height:"100%",overflow:"hidden"}}>
            <HeaderContent
                logout={props.logout?props.logout:Logout}
                {...props}
            />
            {
                renderRoutes(router)
            }
        </div>

    )
}

export default inject(SYSTEM_ROLE_STORE)(observer(PageContent))