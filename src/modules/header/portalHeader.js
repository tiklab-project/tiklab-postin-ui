import React from 'react';
import {verifyUserHoc} from "doublekit-eam-ui";
import {connect} from 'doublekit-plugin-ui/es/_utils';
import './portalStyle.scss'
import PageContent from "./pageContent";

const  PortalHeader = verifyUserHoc(PageContent);

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(PortalHeader);



