
import React from 'react'

import {Directory} from 'doublekit-user-ui';
import {Licence} from "doublekit-licence-ui";
import {PluginDetail} from "doublekit-plugin-ui";
import PortalHeader from "./modules/header/portalHeader"

import {
    Home, SearchResult,

    WorkspaceRole, WorkspacePrivilege, Workspace, WorkspaceCreate, WorkspaceJoin, WorkspaceInit,
    WorkspaceList, WorkspaceRecent, WorkspaceDetailLayout,
    LayoutApiContent, TabsPage, LayoutQuickTest, TabsQuickTest, TestdetailQuickTest, WorkspaceDetailInitPage,
    Category, ApxMethod, ApxMethodDetail,

    Test, TestCase, TestCaseDetail,
    Mock, MockDetail,

    SysManage,  DataStructure, ApiStatus,
    Usermgr, Org, ProjectFeature, ProjectRole,
    SystemFeature, SystemRole, PluginManage,
    MessageManagement, MessageSendType, MessageTemplate, MessageType, MessageUser,
    LoginOut, LoginContent, ElectronLoginContant, AccountMember, WorkspaceSetting, WorkspaceFollow
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
    },{
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
                path: "/workspaceinit",
                component: WorkspaceInit,
                exact: true,
                key:'WorkspaceInitPage',
            },
            {
                path: "/workspacePage",
                component: Workspace,
                key:'workspacePage',
                routes:[
                    {
                        path: "/workspacePage/all",
                        key:'WorkspaceList',
                        exact: true,
                        component: WorkspaceList,
                    },
                    {
                        path: "/workspacePage/recent",
                        key:'WorkspaceList',
                        exact: true,
                        component: WorkspaceRecent,
                    },
                    {
                        path: "/workspacePage/create",
                        key:'WorkspaceList',
                        exact: true,
                        component: WorkspaceCreate,
                    },
                    {
                        path: "/workspacePage/join",
                        key:'WorkspaceList',
                        exact: true,
                        component: WorkspaceJoin,
                    },{
                        path: "/workspacePage/follow",
                        key:'WorkspaceList',
                        exact: true,
                        component: WorkspaceFollow,
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
                path: "/workspace",
                key:'DetailIndex',
                routes:[
                    {
                        path: "/workspace/apis",
                        key:'apis',
                        component: LayoutApiContent,
                        routes:[
                            {
                                path: "/workspace/apis/detail",
                                key:'TabsPage',
                                component: TabsPage,
                                routes:[
                                    {
                                        path: "/workspace/apis/detail/apiInitPage",
                                        exact: true,
                                        key:'Category',
                                        component: WorkspaceDetailInitPage,
                                    },
                                    {
                                        path: "/workspace/apis/detail/category",
                                        exact: true,
                                        key:'Category',
                                        component: Category,
                                    },{
                                        path:"/workspace/apis/detail/interface",
                                        component: ApxMethod,
                                        key:'ApxMethod',
                                        routes:[
                                            {
                                                path:"/workspace/apis/detail/interface/detail",
                                                exact: true,
                                                key:'ApxMethodDetail',
                                                component: ApxMethodDetail,
                                            },
                                            {
                                                path:"/workspace/apis/detail/interface/test",
                                                exact: true,
                                                key:'test',
                                                component: Test,
                                            },{
                                                path:"/workspace/apis/detail/interface/testcase",
                                                exact: true,
                                                key:'testcase',
                                                component: TestCase,
                                            },
                                            {
                                                path:"/workspace/apis/detail/interface/testcasedetail",
                                                exact: true,
                                                key:'testCaseDetail',
                                                component: TestCaseDetail,
                                            },
                                            {
                                                path:'/workspace/apis/detail/interface/mock',
                                                key:'mock',
                                                exact: true,
                                                component: Mock
                                            },
                                            {
                                                path:'/workspace/apis/detail/interface/mockdetail',
                                                exact: true,
                                                key:'mockDetail',
                                                component:MockDetail
                                            },
                                            {
                                                path:"/workspace/apis/detail/interface",
                                                exact: true,
                                                key:'ridinterfacedetail',
                                                component: ()=><Redirect to='/workspace/apis/detail/interface/detail'/>,
                                            },
                                        ]
                                    },
                                    {
                                        path:"/workspace/apis/detail",
                                        exact: true,
                                        key:'ridapidetail',
                                        component: ()=><Redirect to='/workspace/apis/detail/apiInitPage'/>,
                                    },
                                ]
                            },
                            {
                                path:"/workspace/apis",
                                exact: true,
                                key:'ridapisdetail',
                                component: ()=><Redirect to='/workspace/apis/detail'/>,
                            },
                        ]
                    },
                    {
                        path: "/workspace/quickTest",
                        key:'quickTest',
                        component: LayoutQuickTest,
                        routes:[
                            {
                                path: "/workspace/quickTest/detail",
                                key: 'TabsQuickTest',
                                component: TabsQuickTest,
                                routes: [
                                    {
                                        path: "/workspace/quickTest/detail/api",

                                        key:'TestdetailQuickTest',
                                        component: TestdetailQuickTest,
                                    },{
                                        path:"/workspace/quickTest/detail",
                                        exact: true,
                                        key:'reTestdetailQuickTest',
                                        component: ()=><Redirect to='/workspace/quickTest/detail/api'/>,
                                    },
                                ]
                            },
                            {
                                path:"/workspace/quickTest",
                                exact: true,
                                key:'ridquickTestdetail',
                                component: ()=><Redirect to='/workspace/quickTest/detail'/>,
                            },
                        ]
                    },{
                        path: "/workspace/dataStructure",
                        key:'dataStucture',
                        exact: true,
                        component: DataStructure,
                    },
                    {
                        path: "/workspace/workspaceSetting",
                        key:'workspaceSetting',
                        component: WorkspaceSetting,
                        routes: [
                            {
                                path: "/workspace/workspaceSetting/apistatus",
                                key:'apistatus',
                                exact: true,
                                component: ApiStatus,
                            },{
                                path: "/workspace/workspaceSetting/role",
                                key:'role',
                                exact: true,
                                component: WorkspaceRole,
                            },
                            {
                                path: "/workspace/workspaceSetting/workspacePrivilege",
                                key:'privilege',
                                exact: true,
                                component: WorkspacePrivilege,
                            },{
                                path:"/workspace/workspaceSetting",
                                key:'ridworkspaceSetting',
                                exact: true,
                                component: ()=><Redirect to='/workspace/workspaceSetting/apistatus'/>,
                            },
                        ]
                    },

                    {
                        path:"/workspace",
                        key:'ridapidetail',
                        exact: true,
                        component: ()=><Redirect to='/workspace/apis'/>,
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
