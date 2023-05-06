import React from 'react'
//----平台组件----

import {Directory, Orga, UserGroup, User,} from "tiklab-user-ui";
import { NotFound, ProjectFeature, ProjectRole, SystemFeature, SystemRole} from "tiklab-privilege-ui"

import {ExcludeProductUser} from "tiklab-eam-ui";
import {ProductAuth} from "tiklab-licence-ui"
import {LogTemplate, LogType, MyLog} from "tiklab-security-ui";
import {PluginDetail, Plugin} from "tiklab-plugin-manager-ui";
import {MessageNotice, MessageSendType, MessageType} from "tiklab-message-ui";

//----内部组件----
import PortalHeader from "./common/header/PortalContent"
import {
    Home, SearchResult,

    WorkspaceRole, WorkspacePrivilege, Workspace,
    WorkspaceDetailLayout,
    LayoutApiContent, LayoutQuickTest,  WorkspaceDetailInitPage,
    Category, ApxMethodDetail,

    Mock, MockDetail,

    SystemContent,

    LoginOut, WorkspaceSettingMenu,
} from './container';

import {Redirect} from "react-router";

import TestBoxQuickTest from "./quicktest/components/TestBoxQuickTest";
import TestBox from "./api/http/test/test/components/ApiTestPage";
import LoginContent from "./login/LoginContent";
import WorkspaceSetting from "./workspace/setting/WorkspaceSetting";
import DynamicDetail from "./home/DynamicDetail";
import Version from "./setting/version/Version";
import StructureDetail from "./support/dataStructure/components/StructureDetail";
import Share from "./api/http/document/components/Share";
import ShareMain from "./api/http/document/components/ShareMain";
import ApiDocument from "./api/http/definition/components/ApiDocumentPage";
import ApiInitPage from "./workspace/common/ApiInitPage";
import DataStructure from "./support/dataStructure/components/DataStructure";
import WorkspaceEdit from "./workspace/workspace/components/WorkspaceEdit";


const routers =  [
    {
        path: "/share",
        component: Share,
        key:'Share',
        routes: [
            {
                path: "/share/:id",
                component: ShareMain,
                key:'Share',
            },
        ]
    },
    {
        path: "/login",
        component: LoginContent,
        exact: true,
        key:'Login',
    },
    {
        path: "/logout",
        component: LoginOut,
        exact: true,
        key:'logout',
    },
    {
        path:"/index/404",
        render:(props)=>{
            return <NotFound {...props}/>
        }
    },
    {
        path:"/no-auth",
        exact: true,
        render:(props)=>{
            return <ExcludeProductUser {...props}/>
        }
    },
    {
        component: PortalHeader,
        path: '/',
        key:'poroute',
        routes:[
            {
                path: "/home",
                component: Home,
                exact: true,
                key:'Home',
            },
            {
                path: "/dynamic",
                component: DynamicDetail,
                exact: true,
                key:'DynamicDetail',
            },
            // {
            //     path: "/test",
            //     component: Test,
            //     key:'test',
            // },
            {
                path: "/workspacePage",
                component: Workspace,
                key:'workspacePage',
            },
            {
                path: "/workspace-edit",
                component: WorkspaceEdit,
                key:'workspace-edit',
            },
            {
                path:'/systemManagement',
                key:'systemManagement',
                component:SystemContent,
                routes:[
                    //成员与部门
                    {
                        path: "/systemManagement/org",
                        key:'org',
                        exact: true,
                        render:(props)=> <Orga {...props} bgroup={'postin'}/>
                    },{
                        path: "/systemManagement/user",
                        key:'user',
                        exact: true,
                        render:(props)=>{
                            return <User {...props} bgroup={'postin'}/>
                        }
                    },{
                        path: "/systemManagement/authConfig",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false}/>,
                    },{
                        path: "/systemManagement/userGroup",
                        key:'authConfig',
                        exact: true,
                        render: () => <UserGroup />,
                    },
                    //权限
                    {
                        path: "/systemManagement/systemRole",
                        key:'SystemRole',
                        render: () => <SystemRole group={'system'} bgroup={"postin"}/>,
                    },
                    //消息
                    {
                        path: "/systemManagement/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"postin"} />
                    },
                    {
                        path: "/systemManagement/message-notice",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"postin"}/>
                    },
                    // //代办
                    // {
                    //     path: "/systemManagement/myTodo",
                    //     key:'myTodo',
                    //     exact: true,
                    //     render:(props)=> <MyTodoTask {...props} bgroup={"postin"}/>
                    // },
                    //插件
                    {
                        path: "/systemManagement/plugin",
                        key:'plugin',
                        render:(props)=> <Plugin {...props}  detailRouter={"/systemManagement/plugindetail"}/>,
                    },
                    {
                        path: "/systemManagement/plugindetail",
                        key:'plugindetail',
                        exact: true,
                        render:()=> <PluginDetail  pluginsRoute={"/systemManagement/plugin"}/>,
                    },
                    //日志
                    {
                        path: "/systemManagement/log",
                        key:'log',
                        exact: true,
                        render:(props)=>  <MyLog {...props} bgroup={"postin"}/>,
                    },
                    //版本
                    {
                        path: "/systemManagement/version",
                        key:'version',
                        exact: true,
                        component:Version

                    },
                    //产品授权
                    {
                        path: "/systemManagement/product",
                        key:'version',
                        exact: true,
                        render:(props)=><ProductAuth />
                    },


                    {
                        path: "/systemManagement/baseSystemRole",
                        exact: true,
                        render: () => <SystemRole isBase={true} group={'system'} bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        render: () => <SystemFeature isBase={true} bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        render: (props) => <ProjectFeature isBase={true} {...props} bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/role",
                        key:'ProjectRole',
                        exact: true,
                        render: (props) => <ProjectRole isBase={true} {...props} bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/messageSendTypeBase",
                        key:'messageSendTypeBase',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"postin"} isBase={true}/>
                    },
                    {
                        path: "/systemManagement/message-notice-base",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"postin"} isBase={true}/>
                    },
                    {
                        path: "/systemManagement/messageType",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageType bgroup={"postin"}  isBase={true}/>

                    },
                    {
                        path: "/systemManagement/logTemplate",
                        key:'logTemplate',
                        exact: true,
                        render:(props)=>  <LogTemplate {...props} bgroup={"postin"}/>,
                    },{
                        path: "/systemManagement/logType",
                        key:'logTemplate',
                        exact: true,
                        render:()=>  <LogType bgroup={"postin"}/>,
                    },
                    // {
                    //     path: "/systemManagement/taskList",
                    //     key:'todo',
                    //     exact: true,
                    //     render:(props)=> <TaskList {...props} bgroup={"postin"}/>,
                    // },{
                    //     path: "/systemManagement/todoTemp",
                    //     key:'todoTemp',
                    //     exact: true,
                    //     render:(props)=> <TodoTempList {...props} bgroup={"postin"}/>,
                    // },
                    {
                        path: "/systemManagement",
                        key:'sysEnvMana',
                        exact: true,
                        render: () => <Redirect to={"/systemManagement/systemRole"}/>,
                    },
                ]
            },

            {
                path: "/searchResult",
                key:'searchResult',
                exact: true,
                component: SearchResult,
            },
            {
                component: WorkspaceDetailLayout,
                path: "/workspace",
                key:'DetailIndex',
                routes:[
                    {
                        path: "/workspace/overview",
                        exact: true,
                        key:'Category',
                        component: WorkspaceDetailInitPage,
                    },
                    {
                        path: "/workspace/apis",
                        key:'apis',
                        component: LayoutApiContent,
                        routes:[
                            {
                                path:"/workspace/apis/init",
                                exact: true,
                                component: ApiInitPage,
                            },
                            {
                                path: "/workspace/apis/category",
                                exact: true,
                                key:'Category',
                                component: Category,
                            },
                            {
                                path:"/workspace/apis/document",
                                exact: true,
                                component: ApiDocument,
                            },
                            {
                                path:"/workspace/apis/edit",
                                exact: true,
                                component: ApxMethodDetail,
                            },
                            {
                                path:"/workspace/apis/test",
                                exact: true,
                                component: TestBox,
                            },
                            {
                                path:'/workspace/apis/mock',
                                exact: true,
                                component: Mock
                            },
                            {
                                path:'/workspace/apis/mock-detail',
                                exact: true,
                                component:MockDetail
                            },
                            {
                                path:"/workspace/apis",
                                exact: true,
                                key:'ridapisdetail',
                                component: ()=><Redirect to='/workspace/apis/init'/>,
                            },
                        ]
                    },
                    {
                        path: "/workspace/quickTest",
                        component: LayoutQuickTest,
                        cacheKey: 'quickTest',
                        cache: true,// 缓存 组件
                        routes:[
                            {
                                path: "/workspace/quickTest/detail",
                                cacheKey: 'TabsQuickTest',
                                component: TestBoxQuickTest,
                                cache: true,// 缓存 组件
                            },
                        ]
                    },{
                        path: "/workspace/dataStructure",
                        key:'dataStucture',
                        exact: true,
                        component: DataStructure,
                    },{
                        path: "/workspace/structure-detail",
                        key:'structure-detail',
                        exact: true,
                        component: StructureDetail,
                    },
                    {
                        path: "/workspace/setting",
                        key:'workspaceSetting',
                        component: WorkspaceSettingMenu,
                        routes: [
                            {
                                path: "/workspace/setting/detail",
                                key:'role',
                                exact: true,
                                component: WorkspaceSetting,
                            },
                            {
                                path: "/workspace/setting/role",
                                key:'role',
                                exact: true,
                                component: WorkspaceRole,
                            },
                            {
                                path: "/workspace/setting/privilege",
                                key:'privilege',
                                exact: true,
                                component: WorkspacePrivilege,
                            },{
                                path:"/workspace/setting",
                                key:'ridworkspaceSetting',
                                exact: true,
                                component: ()=><Redirect to='/workspace/setting/detail'/>,
                            },
                        ]
                    },
                ]
            },
            {
                path: "/",
                key:'tohome',
                exact: true,
                render: () => <Redirect to={"/home"}/>,
            },
        ]
    },

  ];


console.log(routers)
export default routers
