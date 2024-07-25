import React, {useEffect} from "react";
import HeaderContent from "./HeaderContent";
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
import LeftNavCommon from "../leftMenu/LeftNavCommon";
import {useHistory} from "react-router";
import WorkspaceAddModal from "../../workspace/workspace/components/WorkspaceAddModal";

/**
 * 整个页面
 */
const PageContent =(props)=> {
    const {workspaceStore} = props;
    const {visible,setNewCreateWorkspaceModal} = workspaceStore

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

    /**
     * 头部退出方法跳往退出页
     */
    const Logout = () => {
        props.history.push({
            pathname: "/logout",
            state:{
                preRoute: props.location.pathname
            }
        })
    }

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
            name: "新建",
            icon: "chuangjiantianjiapiliangtianjia",
            key: "create",
            router:"/new-create"
        }
    ]

    const clickAddRouter = (item) => {
        if(item.router === "/new-create"){
            setNewCreateWorkspaceModal(true)
            return
        }

        props.history.push(item.router)
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT",item.router);
    };

    /**
     * 点击设置
     */
    const clickSetting = ()=>{
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT","setting");

        props.history.push("/setting/home");
    }

    const startWithIncludes=[
        "/home",
        "/workspaces",
        "/new-create",
        "/setting"
    ]


    const showMainMenu = ()=>{
        let pathname =  history.location.pathname;
        if (startWithIncludes.some(prefix => pathname.startsWith(prefix))) {
            return<div className={"ws-detail-left"} style={{padding:"10px 0"}}>
                <LeftNavCommon
                    menuData={menuData}
                    clickAddRouter={clickAddRouter}
                    clickSetting={clickSetting}
                />
            </div>
        }
    }




    return(
        <div style={{height:"100%",overflow:"hidden"}}>
            <HeaderContent
                logout={props.logout?props.logout:Logout}
                {...props}
            />
            <div className={"ws-detail-main-content"} >
                {showMainMenu()}

                <div style={{height:"100%",flex: 1}}>
                    {renderRoutes(router)}
                </div>
            </div>
            <WorkspaceAddModal />
        </div>

    )
}

export default inject(SYSTEM_ROLE_STORE,"workspaceStore")(observer(PageContent))
