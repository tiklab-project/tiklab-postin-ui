import React from "react";
import {BaseLogOut,LOGIN_STATUS} from "doublekit-portal-ui"
import {inject, observer} from "mobx-react";

const  LoginOut = (props) => {

    return (
        <BaseLogOut {...props}/>
    );
};

export default inject(LOGIN_STATUS)(observer(LoginOut));