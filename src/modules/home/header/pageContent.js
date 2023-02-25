import React, {useEffect} from "react";
import HeaderContent from "./headerContent";
import {renderRoutes} from "react-router-config";
import {getUser} from "tiklab-core-ui";
import './portalStyle.scss'
import {inject, observer} from "mobx-react";
import {EAM_STORE} from "tiklab-eam-ui/es/store";
import { SYSTEM_ROLE_STORE } from 'tiklab-privilege-ui/es/store';


const PageContent =(props)=> {

    const router = props.route.routes;

     const user = getUser();
     useEffect(() => {
         if (user.userId) {
             props.systemRoleStore.getSystemPermissions(user.userId)
         }
     }, [user])

    const Logout = () => {

        props.history.push({
            pathname: '/logout',
            state:{
                preRoute: props.location.pathname
            }
        })
    }


    return(
        <div style={{height:"100%",overflow:"hidden"}}>
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

export default inject(EAM_STORE,SYSTEM_ROLE_STORE)(observer(PageContent))