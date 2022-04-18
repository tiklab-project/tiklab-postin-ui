import React from 'react';
import { loginOutLocal, LOGIN_STATUS } from 'doublekit-portal-ui';
import CommonHeader from "./commonHeader";
import {inject, observer} from "mobx-react";

const LocalHeader = props => {
    const {portalLoginStore} = props;

    const projectLogout = () => {
        loginOutLocal(props.history,portalLoginStore)
    }

    console.log("localHeader");
    
    return(
        <CommonHeader logout={projectLogout} {...props}/>
    )
}
export default inject(LOGIN_STATUS)(observer(LocalHeader));
