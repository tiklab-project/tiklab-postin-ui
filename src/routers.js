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
const Workspace = AsyncComponent(() => import('./workspace/workspace/components/Workspace'));
const WorkspaceEdit = AsyncComponent(() => import("./workspace/workspace/components/WorkspaceEdit"));
const WorkspaceDetailLayout = AsyncComponent(() => import("./workspace/common/WorkspaceDetailLayout"));
const WorkspaceDetailInitPage = AsyncComponent(() => import("./workspace/overview/WorkspaceOverViewPage"));
const Category = AsyncComponent(() => import("./api/api/components/APIList"));
const ApiInitPage = AsyncComponent(() => import("./workspace/common/ApiInitPage"));

const LayoutApiContent = AsyncComponent(() => import( "./api/http/definition/components/LayoutApiContent"));
const HttpContent  = AsyncComponent(() => import( "./api/http/common/HttpContent"));
const WsContent = AsyncComponent(()=>import ("./api/ws/common/WsContent"));

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

const SystemContent = AsyncComponent(() => import("./setting/system/SystemContent"));
const Version = AsyncComponent(() => import("./setting/version/Version"));


const routers =  [
    {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/index"}/>,
    },
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
        routes:[
            {
                path: "/index",
                component: Home,
                exact: true,
            },
            {
                path: "/workspace",
                component: Workspace,
                exact: true,
            },
            {
                path: "/workspaceAdd",
                component: WorkspaceEdit,
                exact: true,
            },

            {
                path:'/setting',
                component:SystemContent,
                routes:[

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
                        render: () => <UserGroup  bgroup={"postin"}/>,
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
                        path: "/setting/messageNotice",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"postin"}/>
                    },
                    {
                        path: "/setting/backups",
                        exact: true,
                        render:()=> <BackupRestore />
                    },
                    {
                        path: "/setting/productAuth",
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
                        render: () => <Redirect to={"/setting/version"}/>,
                    },
                ]
            },

            {
                component: WorkspaceDetailLayout,
                routes:[
                    {
                        path: "/workspace/overview",
                        exact: true,
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
                                path: "/workspace/apis/category/:id",
                                exact: true,
                                component: Category,
                            },
                            {
                                path: "/workspace/apis/http/:id",
                                component: HttpContent,
                            },

                            {
                                path: "/workspace/apis/ws/:id",
                                component: WsContent,
                            },
                            {
                                path:"/workspace/apis",
                                exact: true,
                                component: ()=><Redirect to='/workspace/apis/init'/>,
                            },
                        ]
                    },
                    {
                        path: "/workspace/dataStructure",
                        key:'dataStucture',
                        exact: true,
                        component: DataStructure,
                    },
                    {
                        path: "/workspace/structureDetail",
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
                                path: "/workspace/setting/info",
                                exact: true,
                                component: WorkspaceSetting,
                            },
                            {
                                path: "/workspace/setting/env",
                                exact: true,
                                component: EnvironmentTable,
                            },
                            {
                                path: "/workspace/setting/member",
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
                                component: ()=><Redirect to='/workspace/setting/info'/>,
                            },
                        ]
                    },

                    {
                        component: LayoutQuickTest,
                        routes:[
                            {
                                path: "/workspace/quickTest",
                                component: TestBoxQuickTest,
                                cache: true,
                            },
                        ]
                    },
                ]
            },

            {
                path: "*",
                render: () => <Redirect to={"/404"}/>,
            },
        ]
    },

  ];

export default routers
