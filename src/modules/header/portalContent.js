import React from 'react';
import {verifyUserHoc} from "tiklab-eam-ui";
import {connect} from 'tiklab-plugin-ui/es/_utils';
import PageContent from "./pageContent";
import localImage from "../../assets/img/local.png";

//用于个性化配置，传入不同的图片
const Page = (props)=>{
    return( <PageContent versionImg={localImage} {...props}/>)
}



function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(verifyUserHoc(Page));



