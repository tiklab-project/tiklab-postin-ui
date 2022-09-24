import React from 'react';
import {verifyUserHoc} from "tiklab-eam-ui";
import {connect} from 'tiklab-plugin-ui/es/_utils';
import PageContent from "./pageContent";
import localImage from "../../assets/img/local.png";


//用于个性化配置
const Page = (props)=>{

    const image= ()=>{
        return <img style={{width: 25}} src={localImage} alt='versionImg' />
    }

    //跳转到账号与成员
    let authConfig = JSON.parse(localStorage.getItem("authConfig"))
    const accountAndMember = () =>{
        let url;

        if(authConfig&&authConfig.authUrl){
            url= authConfig.authUrl+"#"+"/orga/dashbord";
        }else {
            url="/eas.html#/orga/dashbord";
        }

        return(
            <div className={"user-hidden-item"} >
                <a style={{"color":"black"}} href={url} target={"_blank"}>账号与成员</a>
            </div>
        )
    }

    return(
        <PageContent
            versionImg={image}
            accountAndMember={accountAndMember}
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



