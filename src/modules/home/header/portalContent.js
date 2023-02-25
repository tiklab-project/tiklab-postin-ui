import React from 'react';
import {verifyUserHoc} from "tiklab-eam-ui";
import {connect} from 'tiklab-plugin-ui/es/_utils';
import PageContent from "./pageContent";


//用于个性化配置
const Page = (props)=>{

    return(
        <PageContent  {...props}/>
    )
}



function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(verifyUserHoc(Page));



