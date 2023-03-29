import React, {useEffect} from "react";
import HeaderContent from "./HeaderContent";
import {renderRoutes} from "react-router-config";
import {getUser} from "tiklab-core-ui";
import './portalStyle.scss'
import {inject, observer} from "mobx-react";
import {EAM_STORE} from "tiklab-eam-ui/es/store";
import { SYSTEM_ROLE_STORE } from 'tiklab-user-ui/es/store';

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
        props.history.push( '/logout')
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

export default inject(EAM_STORE,SYSTEM_ROLE_STORE)(observer(PageContent))