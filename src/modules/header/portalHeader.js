import React from 'react';
import {verifyUserHoc} from "tiklab-eam-ui";
import {connect} from 'tiklab-plugin-ui/es/_utils';
import './portalStyle.scss'
import PageContent from "./pageContent";

const  PortalHeader = verifyUserHoc(PageContent);

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(PortalHeader);



