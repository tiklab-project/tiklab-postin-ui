import React from 'react';;
import {LOGIN_STATUS, verifyUserHOC} from "doublekit-portal-ui";
import {inject, observer} from "mobx-react";
import HeaderContent from "./headerContent";
import {renderRoutes} from "react-router-config";
import './portalStyle.scss'

export const  PortalHeader =(props)=> {
    const router = props.route.routes;

    const Logout = () => {
        props.history.push('/logout')
    }


    return(
        <div style={{height:"100%"}}>
            <HeaderContent
                logout={Logout}
                {...props}
            />
            {
                renderRoutes(router)
            }
        </div>

    )
}

const  WrapPortal = verifyUserHOC(PortalHeader);
export default inject(LOGIN_STATUS)(observer(WrapPortal));

