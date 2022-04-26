import React from 'react';
import {useAccountConfig, useBasePortal, verifyUserHOC} from "doublekit-portal-ui";
import LocalHeader from './localHeader';
import AccountHeader from './accountHeader';
import { inject, observer } from 'mobx-react';

const Portal = props => {

    const {portalLoginStore , history,authData} = props;

    // const authData = useAccountConfig();

    // useBasePortal(portalLoginStore, history, "/login")

    const isCeEeHeader = () =>{
        if(authData.authType === 'local'){
            return <LocalHeader {...props}/>
        }else {
            return <AccountHeader {...props}/>
        }
    }

    return (
        <div style={{height:"100%"}}>
            {
                isCeEeHeader()
            }
            {props.children}
        </div>
    )
}
const  WrapPortal = verifyUserHOC(Portal);
export default inject("portalLoginStore")(observer(WrapPortal));

