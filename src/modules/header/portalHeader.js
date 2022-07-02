import React from 'react';
import {verifyUserHOC} from "doublekit-eam-ui";
import {connect} from 'doublekit-plugin-ui';
import './portalStyle.scss'
import PageContent from "./pageContent";

const  PortalHeader = verifyUserHOC(PageContent);

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(PortalHeader);



