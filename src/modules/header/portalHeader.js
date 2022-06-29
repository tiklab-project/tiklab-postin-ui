import React from 'react';
import {EAM_STORE, verifyUserHOC} from "doublekit-eam-ui";
import {connect} from 'doublekit-plugin-ui';
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
        </div>

    )
}

const  WrapPortal = verifyUserHOC(PortalHeader);

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(inject(EAM_STORE)(observer(WrapPortal)));

// export default inject(EAM_STORE)(observer(WrapPortal));

