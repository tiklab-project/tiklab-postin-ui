import React from 'react';;
import {LOGIN_STATUS, loginOutLocal, verifyUserHOC, loginOutAcc, useAccountConfig} from "doublekit-portal-ui";
import {inject, observer} from "mobx-react";
import HeaderContent from "./headerContent";
import {renderRoutes} from "react-router-config";
import './portalStyle.scss'

const  PortalHeader =(props)=> {
    const {authData,portalLoginStore} = props;
    const router = props.route.routes;

    let auth= useAccountConfig()

    const logout = () =>{
        if (authData.authType === 'local') {
            console.log('logout local');
            return loginOutLocal(props.history,portalLoginStore)
        } else {
            console.log('logout acc');
            return loginOutAcc(auth.authUrl,props.history)
        }
    }


    return(
        <div style={{height:"100%"}}>
            <HeaderContent
                logout={logout}
                {...props}
            />
            {
                renderRoutes(router)
            }
        </div>

    )
}

const  WrapPortal = verifyUserHOC(PortalHeader);
export default inject("portalLoginStore",LOGIN_STATUS)(observer(WrapPortal));

