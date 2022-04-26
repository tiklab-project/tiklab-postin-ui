import React from 'react';
import {useAccountConfig} from "doublekit-portal-ui";
import { loginOutAcc } from 'doublekit-portal-ui';
import CommonHeader from "./commonHeader";

const AccountHeader = props => {
    const authData = useAccountConfig();


    const AccountLogout = () => {

        loginOutAcc(authData.authUrl)
    }

    console.log("AccHeader");

    return (
        <CommonHeader logout={AccountLogout}  {...props}/>
    )
}
export default AccountHeader;