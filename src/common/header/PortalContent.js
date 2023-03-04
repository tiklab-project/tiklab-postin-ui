import React from 'react';
import {verifyUserHoc} from "tiklab-eam-ui";
import {connect} from 'tiklab-plugin-ui/es/_utils';
import PageContent from "./PageContent";


/**
 * 用于个性化配置
 */
const Page = (props)=>{

    return(
        <PageContent  {...props}/>
    )
}


/**
 * 获取connect传递过来的pluginStore，返回一个对象
 */
function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

/**
 * 再把对象，使用平台高阶组件传递给verifyUser，验证用户
 */
export default connect(mapStateToProps)(verifyUserHoc(Page));



