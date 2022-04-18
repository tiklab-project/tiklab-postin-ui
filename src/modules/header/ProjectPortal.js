import React from 'react';
import {useAccountConfig, useBasePortal} from "doublekit-portal-ui";
import LocalHeader from './localHeader';
import AccountHeader from './accountHeader';
import { inject, observer } from 'mobx-react';

const Portal = props => {

    const {portalLoginStore , history} = props;

    const authData = useAccountConfig();

    useBasePortal(portalLoginStore, history, "/login")

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

export default inject("portalLoginStore")(observer(Portal));

