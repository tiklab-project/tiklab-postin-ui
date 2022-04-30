import React from "react";
import {BaseLogOut,useAccountConfig,LOGIN_STATUS} from "doublekit-portal-ui"
import {inject, observer} from "mobx-react";

const  LoginOut = (props) => {
    let authConfig = useAccountConfig();

    return (
        <BaseLogOut authConfig={authConfig} {...props}/>
    );
};

export default inject(LOGIN_STATUS)(observer(LoginOut));