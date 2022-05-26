import React from 'react';
import {EAM_STORE, verifyUserHOC} from "doublekit-eam-ui";
import {inject, observer} from "mobx-react";
import HeaderContent from "./headerContent";
import {renderRoutes} from "react-router-config";
import './portalStyle.scss'

export const  PortalHeader =(props)=> {
    const router = props.route.routes;

    const Logout = () => {
        props.history.push({
            pathname: '/logout',
            state:{
                preRoute: props.location.pathname
            }
        })
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
            <div className={"api-footer"}>
                <div>footer</div>
                <div>version: 1.0.0</div>
            </div>
        </div>

    )
}

const  WrapPortal = verifyUserHOC(PortalHeader);
export default inject(EAM_STORE)(observer(WrapPortal));

