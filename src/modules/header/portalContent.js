import React from 'react';
import {verifyUserHoc} from "tiklab-eam-ui";
import {getUser, parseUserSearchParams} from "tiklab-core-ui";
import {connect} from 'tiklab-plugin-ui/es/_utils';
import PageContent from "./pageContent";
import localImage from "../../assets/img/local.png";


//用于个性化配置
const Page = (props)=>{

    const image= ()=>{
        return <img style={{width: 25}} src={localImage} alt='versionImg' />
    }


    return(
        <PageContent
            versionImg={image}
            {...props}
        />
    )
}



function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(verifyUserHoc(Page));



