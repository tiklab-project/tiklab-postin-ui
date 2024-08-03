import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";
import {getUser} from "thoughtware-core-ui";
import './portalStyle.scss'
import '../styles/base.scss';
import '../styles/global.scss';
import '../language/i18n';
import "../../assets/iconfont/iconfont";
import "../../assets/iconfont/iconfont.css";
import {inject, observer} from "mobx-react";
import {SYSTEM_ROLE_STORE} from 'thoughtware-privilege-ui/es/store';
import {useHistory} from "react-router";
import LeftMenuCommon from "../LeftMenuCommon/LeftMenuCommon";

/**
 * 整个页面
 */
const PageContent =(props)=> {
    const {workspaceStore} = props;
    const {setNewCreateWorkspaceModal} = workspaceStore

    const router = props.route.routes;
    const user = getUser();
    const history = useHistory()

    useEffect(()=>{
        //给左侧导航设置一个选择项
        localStorage.setItem("LEFT_MENU_SELECT","/home")
    },[])

    useEffect(() => {
         if (user.userId) {
             props.systemRoleStore.getSystemPermissions(user.userId)
         }
     }, [user])

    const menuData = [
        {
            name:"主页",
            icon: "home",
            key:"home",
            router:"/home"
        },
        {
            name: "空间",
            icon: "xiangmu1",
            key: "workspaces",
            router:"/workspaces"
        },
        {
            name: "设置",
            icon: "setting",
            key: "setting",
            router:"/setting/version"
        },
    ]

    const startWithIncludes=[
        "/home",
        "/workspaces",
    ]

    const showMainMenu = ()=>{
        let pathname =  history.location.pathname;
        if (startWithIncludes.some(prefix => pathname.startsWith(prefix))) {
             return<LeftMenuCommon
                 setNewCreateWorkspaceModal={setNewCreateWorkspaceModal}
                menuData={menuData}
                isFirst={true}
                {...props}
            />
        }
    }

    return(
        <>
            <div className={"main-content"} >
                {showMainMenu()}
                <div style={{height:"100%",flex: 1}}>
                    {renderRoutes(router)}
                </div>
            </div>
        </>

    )
}

export default inject(SYSTEM_ROLE_STORE,"workspaceStore")(observer(PageContent))
