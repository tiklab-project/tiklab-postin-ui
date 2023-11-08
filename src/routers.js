import React,{lazy} from 'react'
import {Redirect} from "react-router";
import AsyncComponent from "./common/lazy/SyncComponent";
//----平台组件----

import {Directory, Orga, UserGroup, User,} from "tiklab-user-ui";
import { NotFound, ProjectFeature, ProjectRole, SystemFeature, SystemRole} from "tiklab-privilege-ui"

import {ExcludeProductUser} from "tiklab-eam-ui";
import {BackupRecovery, LogTemplate, LogType, MyLog} from "tiklab-security-ui";

import {PluginDetail, Plugin} from "tiklab-plugin-manager-ui";
import {MessageNotice, MessageSendType, MessageType} from "tiklab-message-ui";
import Demo from "./Demo";


//----内部组件----
const PortalHeader = AsyncComponent(() => import("./common/header/PortalContent"));
const Home = AsyncComponent(() => import('./home/Home'));
const SearchResult = AsyncComponent(() => import('./common/header/search'));
const WorkspaceRole = AsyncComponent(() => import('./workspace/setting/WorkspaceRole'));
const WorkspacePrivilege = AsyncComponent(() => import('./workspace/setting/WorkspacePrivilege'));
const Workspace = AsyncComponent(() => import('./workspace/workspace/components/Workspace'));
const WorkspaceDetailLayout = AsyncComponent(() => import("./workspace/common/WorkspaceDetailLayout"));
const LayoutApiContent = AsyncComponent(() => import( "./api/http/definition/components/LayoutApiContent"));
const LayoutQuickTest = AsyncComponent(() => import("./quicktest/common/LayoutQuickTest"));
const WorkspaceDetailInitPage = AsyncComponent(() => import("./workspace/overview/WorkspaceOverViewPage"));
const Category = AsyncComponent(() => import("./api/api/components/APIList"));
const ApiContent  = AsyncComponent(() => import( "./api/http/common/ApiContent"));
const ApxMethodDetail = AsyncComponent(() => import("./api/http/definition/components/ApxMethodEditPage"));
const Mock = AsyncComponent(() => import("./api/http/mock/components/Mock"));
const MockDetail = AsyncComponent(() => import("./api/http/mock/components/MockDetail"));
const SystemContent = AsyncComponent(() => import("./setting/system/SystemContent"));
const LoginOut = AsyncComponent(() => import("./common/header/LoginOut"));
const WorkspaceSettingMenu = AsyncComponent(() => import("./workspace/setting/WorkspaceSettingMenu"));
const TestBoxQuickTest = AsyncComponent(() => import("./quicktest/http/components/TestBoxQuickTest"));
const TestBox = AsyncComponent(() => import( "./api/http/test/test/components/ApiTestPage"));
const LoginContent = AsyncComponent(() => import("./login/LoginContent"));
const WorkspaceSetting = AsyncComponent(() => import("./workspace/setting/WorkspaceSetting"));
const Version = AsyncComponent(() => import("./setting/version/Version"));
const StructureDetail = AsyncComponent(() => import("./support/dataStructure/components/StructureDetail"));
const Share = AsyncComponent(() => import("./api/http/document/components/Share"));
const ShareMain = AsyncComponent(() => import("./api/http/document/components/ShareMain"));
const ApiDocument = AsyncComponent(() => import("./api/http/definition/components/ApiDocumentPage"));
const ApiInitPage = AsyncComponent(() => import("./workspace/common/ApiInitPage"));
const DataStructure = AsyncComponent(() => import("./support/dataStructure/components/DataStructure"));
const WorkspaceEdit = AsyncComponent(() => import("./workspace/workspace/components/WorkspaceEdit"));
const EnvironmentTable = AsyncComponent(()=>import ("./support/environment/components/EnvironmentTable"))

const WsContent = AsyncComponent(()=>import ("./api/ws/common/WSContent"));
const WSDocumentPage = AsyncComponent(()=>import ( "./api/ws/document/components/WSDocumentPage"));
const WSDesignPage = AsyncComponent(()=>import ( "./api/ws/design/components/WSDesignPage"));
const WSTestPage = AsyncComponent(()=>import ("./api/ws/test/components/WSTestPage"));


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
                path: "/demo",
                component: Demo,
                exact: true,
                key:'Home',
            },
            {
                path: "/home",
                component: Home,
                exact: true,
                key:'Home',
            },
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
                    {
                        path: "/systemManagement/backups",
                        exact: true,
                        render:()=> <BackupRecovery />
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
                    // {
                    //     path: "/systemManagement/product",
                    //     key:'version',
                    //     exact: true,
                    //     render:(props)=><ProductAuth />
                    // },


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
                                path: "/workspace/apis/http",
                                component: ApiContent,
                                routes:[

                                    {
                                        path:"/workspace/apis/http/document",
                                        exact: true,
                                        component: ApiDocument,
                                    },
                                    {
                                        path:"/workspace/apis/http/edit",
                                        exact: true,
                                        component: ApxMethodDetail,
                                    },
                                    {
                                        path:"/workspace/apis/http/test",
                                        exact: true,
                                        component: TestBox,
                                    },
                                    {
                                        path:'/workspace/apis/http/mock',
                                        exact: true,
                                        component: Mock
                                    },
                                    {
                                        path:'/workspace/apis/http/mock-detail',
                                        exact: true,
                                        component:MockDetail
                                    },
                                ]
                            },

                            {
                                path: "/workspace/apis/ws",
                                component: WsContent,
                                routes:[
                                    {
                                        path:"/workspace/apis/ws/document",
                                        exact: true,
                                        component: WSDocumentPage,
                                    },{
                                        path:"/workspace/apis/ws/design",
                                        exact: true,
                                        component: WSDesignPage,
                                    },{
                                        path:"/workspace/apis/ws/test",
                                        exact: true,
                                        component: WSTestPage,
                                    }
                                ]
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
                                exact: true,
                                component: WorkspaceSetting,
                            },
                            {
                                path: "/workspace/setting/env",
                                exact: true,
                                component: EnvironmentTable,
                            },
                            {
                                path: "/workspace/setting/role",
                                exact: true,
                                component: WorkspaceRole,
                            },
                            {
                                path: "/workspace/setting/privilege",
                                exact: true,
                                component: WorkspacePrivilege,
                            },{
                                path:"/workspace/setting",
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

export default routers
