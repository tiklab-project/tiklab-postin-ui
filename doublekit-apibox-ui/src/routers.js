
import React from 'react'

import {Directory} from 'doublekit-user-ui';
import {Licence} from "doublekit-licence-ui";
import {PluginDetail} from "doublekit-plugin-ui";

import {
    PortalHeader,
    Home, SearchResult,

    WorkspaceRole, WorkspacePrivilege, Workspace, WorkspaceInitPage, WorkspaceParticipation, WorkspaceCreatePage,
    WorkspaceList, WorkspaceRecent, RecentBrowing, WorkspaceDetailLayout,
    LayoutApiContent, TabsPage, LayoutQuickTest, TabsQuickTest, TestdetailQuickTest, WorkspaceDetailInitPage,
    Category, ApxMethod, ApxMethodDetail,

    Test, TestCase, TestCaseDetail,
    Mock, MockDetail,

    SysManage, EvnMana, DataStructure, ApiStatus,
    Usermgr, Org, ProjectFeature, ProjectRole,
    SystemFeature, SystemRole, PluginManage,
    MessageManagement, MessageSendType, MessageTemplate, MessageType, MessageUser,
    LoginOut, LoginContent, ElectronLoginContant, AccountMember, WorkspaceSetting
} from './modules';

import {Redirect} from "react-router";
import {AuthResult} from "doublekit-eam-ui";

const routers =  [
    {
        path: "/login",
        exact: true,
        component: LoginContent,
        key:'login',
    },
    {
        path: "/logout",
        component: LoginOut,
        exact: true,
        key:'logout',
    },
    {
        path:"/account",
        component:ElectronLoginContant,
        key:"account",
        exact: true,
    },{
        path:"/auth_result",
        component:AuthResult,
        key:"auth_result",
        exact: true,
    },
    {
        component: PortalHeader,
        path: '/pluginfull',
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
                path: "/workspaceinitpage",
                component: WorkspaceInitPage,
                exact: true,
                key:'WorkspaceInitPage',
            },
            {
                path: "/workspace",
                component: Workspace,
                key:'Workspace',
                routes:[
                    {
                        path: "/workspace/alllist",
                        key:'WorkspaceList',
                        exact: true,
                        component: WorkspaceList,
                    },
                    {
                        path: "/workspace/recently",
                        key:'WorkspaceList',
                        exact: true,
                        component: WorkspaceRecent,
                    },
                    {
                        path: "/workspace/create",
                        key:'WorkspaceList',
                        exact: true,
                        component: WorkspaceCreatePage,
                    },
                    {
                        path: "/workspace/participation",
                        key:'WorkspaceList',
                        exact: true,
                        component: WorkspaceParticipation,
                    },
                ]
            },
            {
                path:'/systemManagement',
                key:'systemManagement',
                component:SysManage,
                routes:[
                    {
                        path: "/systemManagement/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        component: ProjectFeature,
                    },
                    {
                        path: "/systemManagement/role",
                        key:'ProjectRole',
                        exact: true,
                        component: ProjectRole,
                    },
                    {
                        path: "/systemManagement/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        component: SystemFeature,
                    },
                    {
                        path: "/systemManagement/systemRole",
                        key:'SystemRole',
                        exact: true,
                        component: SystemRole,
                    },
                    {
                        path: "/systemManagement/messageManagement",
                        key:'MessageManagement',
                        exact: true,
                        component: MessageManagement,
                    },
                    {
                        path: "/systemManagement/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        component: MessageSendType,
                    },
                    {
                        path: "/systemManagement/messageTemplate",
                        key:'MessageTemplate',
                        exact: true,
                        component: MessageTemplate,
                    },
                    {
                        path: "/systemManagement/messageType",
                        key:'MessageType',
                        exact: true,
                        component: MessageType,
                    },
                    {
                        path: "/systemManagement/pluginmanage",
                        key:'pluginmanage',
                        component: PluginManage,
                    },
                    {
                        path: "/systemManagement/licence",
                        key:'licence',
                        exact: true,
                        component: Licence,
                    },
                    {
                        path: "/systemManagement",
                        key:'sysEnvMana',
                        exact: true,
                        render: () => <Redirect to={"/systemManagement/privilege"}/>,
                    },
                ]
            },
            {
                path: "/accountMember",
                key:'accountMember',
                component: AccountMember,
                routes: [
                    {
                        path: "/accountMember/org",
                        key:'org',
                        exact: true,
                        component: Org,
                    },
                    {
                        path: "/accountMember/user",
                        key:'user',
                        exact: true,
                        component: Usermgr,
                    },
                    {
                        path: "/accountMember/authConfig",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false}/>,
                    },{
                        path: "/accountMember",
                        key:'sysEnvMana',
                        exact: true,
                        render: () => <Redirect to={"/accountMember/org"}/>,
                    },
                ]
            },
            {
                path: "/plugindetail",
                key:'plugindetail',
                exact: true,
                component: PluginDetail,
            },
            {
                path: "/searchResult",
                key:'searchResult',
                exact: true,
                component: SearchResult,
            },
            {
                path: "/MessageUser",
                key:'MessageUser',
                exact: true,
                component: MessageUser,
            },
            {
                component: WorkspaceDetailLayout,
                path: "/workspacepage",
                key:'DetailIndex',
                routes:[
                    {
                        path: "/workspacepage/apis",
                        key:'apis',
                        component: LayoutApiContent,
                        routes:[
                            {
                                path: "/workspacepage/apis/detail",
                                key:'TabsPage',
                                component: TabsPage,
                                routes:[
                                    {
                                        path: "/workspacepage/apis/detail/apiInitPage",
                                        exact: true,
                                        key:'Category',
                                        component: WorkspaceDetailInitPage,
                                    },
                                    {
                                        path: "/workspacepage/apis/detail/category",
                                        exact: true,
                                        key:'Category',
                                        component: Category,
                                    },{
                                        path:"/workspacepage/apis/detail/interface",
                                        component: ApxMethod,
                                        key:'ApxMethod',
                                        routes:[
                                            {
                                                path:"/workspacepage/apis/detail/interface/detail",
                                                exact: true,
                                                key:'ApxMethodDetail',
                                                component: ApxMethodDetail,
                                            },
                                            {
                                                path:"/workspacepage/apis/detail/interface/test",
                                                exact: true,
                                                key:'test',
                                                component: Test,
                                            },{
                                                path:"/workspacepage/apis/detail/interface/testcase",
                                                exact: true,
                                                key:'testcase',
                                                component: TestCase,
                                            },
                                            {
                                                path:"/workspacepage/apis/detail/interface/testcasedetail",
                                                exact: true,
                                                key:'testCaseDetail',
                                                component: TestCaseDetail,
                                            },
                                            {
                                                path:'/workspacepage/apis/detail/interface/mock',
                                                key:'mock',
                                                exact: true,
                                                component: Mock
                                            },
                                            {
                                                path:'/workspacepage/apis/detail/interface/mockdetail',
                                                exact: true,
                                                key:'mockDetail',
                                                component:MockDetail
                                            },
                                            {
                                                path:"/workspacepage/apis/detail/interface",
                                                exact: true,
                                                key:'ridinterfacedetail',
                                                component: ()=><Redirect to='/workspacepage/apis/detail/interface/detail'/>,
                                            },
                                        ]
                                    },
                                    {
                                        path:"/workspacepage/apis/detail",
                                        exact: true,
                                        key:'ridapidetail',
                                        component: ()=><Redirect to='/workspacepage/apis/detail/apiInitPage'/>,
                                    },
                                ]
                            },
                            {
                                path:"/workspacepage/apis",
                                exact: true,
                                key:'ridapisdetail',
                                component: ()=><Redirect to='/workspacepage/apis/detail'/>,
                            },
                        ]
                    },
                    {
                        path: "/workspacepage/quickTest",
                        key:'quickTest',
                        component: LayoutQuickTest,
                        routes:[
                            {
                                path: "/workspacepage/quickTest/detail",
                                key: 'TabsQuickTest',
                                component: TabsQuickTest,
                                routes: [
                                    {
                                        path: "/workspacepage/quickTest/detail/api",

                                        key:'TestdetailQuickTest',
                                        component: TestdetailQuickTest,
                                    },{
                                        path:"/workspacepage/quickTest/detail",
                                        exact: true,
                                        key:'reTestdetailQuickTest',
                                        component: ()=><Redirect to='/workspacepage/quickTest/detail/api'/>,
                                    },
                                ]
                            },
                            {
                                path:"/workspacepage/quickTest",
                                exact: true,
                                key:'ridquickTestdetail',
                                component: ()=><Redirect to='/workspacepage/quickTest/detail'/>,
                            },
                        ]
                    },{
                        path: "/workspacepage/dataStructure",
                        key:'dataStucture',
                        exact: true,
                        component: DataStructure,
                    },
                    {
                        path: "/workspacepage/workspaceSetting",
                        key:'workspaceSetting',
                        component: WorkspaceSetting,
                        routes: [
                            {
                                path: "/workspacepage/workspaceSetting/envMana",
                                key:'EvnMana',
                                exact: true,
                                component: EvnMana,
                            }, {
                                path: "/workspacepage/workspaceSetting/apistatus",
                                key:'apistatus',
                                exact: true,
                                component: ApiStatus,
                            },{
                                path: "/workspacepage/workspaceSetting/role",
                                key:'role',
                                exact: true,
                                component: WorkspaceRole,
                            },
                            {
                                path: "/workspacepage/workspaceSetting/workspacePrivilege",
                                key:'privilege',
                                exact: true,
                                component: WorkspacePrivilege,
                            },{
                                path:"/workspacepage/workspaceSetting",
                                key:'ridworkspaceSetting',
                                exact: true,
                                component: ()=><Redirect to='/workspacepage/workspaceSetting/envMana'/>,
                            },
                        ]
                    },

                    {
                        path:"/workspacepage",
                        key:'ridapidetail',
                        exact: true,
                        component: ()=><Redirect to='/workspacepage/apis'/>,
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
    }
  ];

export default routers
