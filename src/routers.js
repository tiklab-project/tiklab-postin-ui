import React from 'react'
import {Redirect} from "react-router";
import AsyncComponent from "./common/lazy/SyncComponent";
//----平台组件----
import {Directory, Orga, UserGroup, User,} from "thoughtware-user-ui";
import {NoAccess, ProjectFeature, ProjectRole, SystemFeature, SystemRole,ProjectVirtualRole} from "thoughtware-privilege-ui"
import {ExcludeProductUser, NotFound} from "thoughtware-eam-ui";
import {BackupRestore, LogTemplate, LogType, MyLog} from "thoughtware-security-ui";
import {MessageNotice, MessageSendType, MessageType} from "thoughtware-message-ui";
import {ProductAuth} from "thoughtware-licence-ui";

//----内部组件----
const LoginContent = AsyncComponent(() => import("./login/LoginContent"));
const LoginOut = AsyncComponent(() => import("./common/header/LoginOut"));
const PortalContent = AsyncComponent(() => import("./common/header/PortalContent"));
const Home = AsyncComponent(() => import('./home/Home'));
const SearchResult = AsyncComponent(() => import('./common/header/search'));
const Workspace = AsyncComponent(() => import('./workspace/workspace/components/Workspace'));
const WorkspaceEdit = AsyncComponent(() => import("./workspace/workspace/components/WorkspaceEdit"));
const WorkspaceDetailLayout = AsyncComponent(() => import("./workspace/common/WorkspaceDetailLayout"));
const WorkspaceDetailInitPage = AsyncComponent(() => import("./workspace/overview/WorkspaceOverViewPage"));
const Category = AsyncComponent(() => import("./api/api/components/APIList"));
const ApiInitPage = AsyncComponent(() => import("./workspace/common/ApiInitPage"));

const LayoutApiContent = AsyncComponent(() => import( "./api/http/definition/components/LayoutApiContent"));
const ApiDocument = AsyncComponent(() => import("./api/http/definition/components/ApiDocumentPage"));
const ApiContent  = AsyncComponent(() => import( "./api/http/common/ApiContent"));
const ApxMethodDetail = AsyncComponent(() => import("./api/http/definition/components/ApxMethodEditPage"));
const Mock = AsyncComponent(() => import("./api/http/mock/components/Mock"));
const MockDetail = AsyncComponent(() => import("./api/http/mock/components/MockDetail"));
const TestBox = AsyncComponent(() => import( "./api/http/test/test/components/ApiTestPage"));

const WsContent = AsyncComponent(()=>import ("./api/ws/common/WSContent"));
const WSDocumentPage = AsyncComponent(()=>import ( "./api/ws/document/components/WSDocumentPage"));
const WSDesignPage = AsyncComponent(()=>import ( "./api/ws/design/components/WSDesignPage"));
const WSTestPage = AsyncComponent(()=>import ("./api/ws/test/components/WSTestPage"));

const LayoutQuickTest = AsyncComponent(() => import("./quicktest/common/LayoutQuickTest"));
const TestBoxQuickTest = AsyncComponent(() => import("./quicktest/http/components/TestBoxQuickTest"));

const WorkspaceRole = AsyncComponent(() => import('./workspace/setting/WorkspaceRole'));
const WorkspacePrivilege = AsyncComponent(() => import('./workspace/setting/WorkspacePrivilege'));
const WorkspaceSettingMenu = AsyncComponent(() => import("./workspace/setting/WorkspaceSettingMenu"));
const WorkspaceSetting = AsyncComponent(() => import("./workspace/setting/WorkspaceSetting"));

const StructureDetail = AsyncComponent(() => import("./support/dataStructure/components/StructureDetail"));
const Share = AsyncComponent(() => import("./support/share/components/Share"));
const ShareMain = AsyncComponent(() => import("./support/share/components/ShareMain"));
const DataStructure = AsyncComponent(() => import("./support/dataStructure/components/DataStructure"));
const EnvironmentTable = AsyncComponent(()=>import ("./support/environment/components/EnvironmentTable"))

const SystemHome = AsyncComponent(() => import("./setting/system/SystemHome"));
const SystemContent = AsyncComponent(() => import("./setting/system/SystemContent"));
const Version = AsyncComponent(() => import("./setting/version/Version"));


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
        exact: true,
        path: '/404',
        render: props => <NotFound {...props} homePath={'/'}/>
    },
    {
        exact: true,
        path: '/noaccess',
        render: props => <NoAccess {...props} homePath={'/'} />
    },
    {
        path:"/no-auth",
        exact: true,
        render:(props)=>{
            return <ExcludeProductUser {...props}/>
        }
    },
    {
        component: PortalContent,
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
                path: "/workspaces",
                component: Workspace,
                key:'workspacePage',
            },
            {
                path: "/workspaces-edit",
                component: WorkspaceEdit,
                key:'workspaces-edit',
            },
            {
                path:'/setting',
                key:'systemManagement',
                component:SystemContent,
                routes:[
                    {
                        path:'/setting/home',
                        exact: true,
                        component:SystemHome,
                    },
                    //成员与部门
                    {
                        path: "/setting/orga",
                        key:'org',
                        exact: true,
                        render:(props)=> <Orga {...props} bgroup={'postin'}/>
                    },{
                        path: "/setting/user",
                        key:'user',
                        exact: true,
                        render:(props)=>{
                            return <User {...props} bgroup={'postin'}/>
                        }
                    },{
                        path: "/setting/dir",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false}  bgroup={"postin"}/>,
                    },{
                        path: "/setting/userGroup",
                        key:'authConfig',
                        exact: true,
                        render: () => <UserGroup />,
                    },
                    //权限
                    {
                        path: "/setting/systemRole",
                        key:'SystemRole',
                        render: () => <SystemRole group={'system'} bgroup={"postin"}/>,
                    },
                    //消息
                    {
                        path: "/setting/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"postin"} />
                    },
                    {
                        path: "/setting/message-notice",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"postin"}/>
                    },
                    {
                        path: "/setting/backups",
                        exact: true,
                        render:()=> <BackupRestore />
                    },{
                        path: "/setting/product-auth",
                        exact: true,
                        render:()=> <ProductAuth  />
                    },


                    //日志
                    {
                        path: "/setting/log",
                        key:'log',
                        exact: true,
                        render:(props)=>  <MyLog {...props} bgroup={"postin"}/>,
                    },
                    //版本
                    {
                        path: "/setting/version",
                        key:'version',
                        exact: true,
                        component:Version

                    },



                    {
                        path: "/setting/baseSystemRole",
                        exact: true,
                        render: () => <SystemRole isBase={true} group={'system'} bgroup={"postin"}/>,
                    },
                    {
                        path: "/setting/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        render: () => <SystemFeature isBase={true} bgroup={"postin"}/>,
                    },
                    {
                        path: "/setting/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        render: (props) => <ProjectFeature isBase={true} {...props} bgroup={"postin"}/>,
                    },
                    {
                        path: "/setting/virtual-role",
                        key:'ProjectRole',
                        exact: true,
                        render: (props) => <ProjectVirtualRole {...props}/>,
                    },
                    {
                        path: "/setting/role",
                        key:'ProjectRole',
                        exact: true,
                        render: (props) => <ProjectRole isBase={true} {...props} bgroup={"postin"}/>,
                    },
                    {
                        path: "/setting/messageSendTypeBase",
                        key:'messageSendTypeBase',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"postin"} isBase={true}/>
                    },
                    {
                        path: "/setting/message-notice-base",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"postin"} isBase={true}/>
                    },
                    {
                        path: "/setting/messageType",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageType bgroup={"postin"}  isBase={true}/>

                    },
                    {
                        path: "/setting/logTemplate",
                        key:'logTemplate',
                        exact: true,
                        render:(props)=>  <LogTemplate {...props} bgroup={"postin"}/>,
                    },{
                        path: "/setting/logType",
                        key:'logTemplate',
                        exact: true,
                        render:()=>  <LogType bgroup={"postin"}/>,
                    },
                    // {
                    //     path: "/setting/taskList",
                    //     key:'todo',
                    //     exact: true,
                    //     render:(props)=> <TaskList {...props} bgroup={"postin"}/>,
                    // },{
                    //     path: "/setting/todoTemp",
                    //     key:'todoTemp',
                    //     exact: true,
                    //     render:(props)=> <TodoTempList {...props} bgroup={"postin"}/>,
                    // },
                    {
                        path: "/setting",
                        key:'sysEnvMana',
                        exact: true,
                        render: () => <Redirect to={"/setting/home"}/>,
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
                        path: "/workspace/overview/:id",
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
                        path: "/workspace/quick",
                        component: LayoutQuickTest,
                        cacheKey: 'quickTest',
                        cache: true,// 缓存 组件
                        routes:[
                            {
                                path: "/workspace/quick/test",
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
            {
                path: "*",
                render: () => <Redirect to={"/404"}/>,
            },
        ]
    },

  ];

export default routers
