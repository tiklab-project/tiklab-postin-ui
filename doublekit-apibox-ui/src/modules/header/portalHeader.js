import React from 'react';
import LocalHeader from "./localHeader";
import AccountHeader from "./accountHeader";
import {verifyUserHOC} from "doublekit-portal-ui";
import {inject, observer} from "mobx-react";

import HeaderContent from "./headerContent";

const RenderHeader = (props) => {
    const {authData} = props;
    if (authData.authType === 'local') {
        return <AccountHeader {...props}/>
    } else {
        return <LocalHeader {...props}/>
    }
};

const  PortalHeader =(props)=> {
    const {authData} = props;

    return(
        <HeaderContent
            header={<RenderHeader authData={authData} {...props}/>}
            {...props}
        />
    )
}

const  WrapPortal = verifyUserHOC(PortalHeader);
export default inject("portalLoginStore")(observer(WrapPortal));

