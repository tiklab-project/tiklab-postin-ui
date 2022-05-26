
import React from 'react'
import PortalHeader from './modules/header/portalHeader';
import {
    Home,
    SearchResult,

    WorkspaceRole,
    WorkspacePrivilege,
    Workspace, WorkspaceInitPage,
    WorkspaceParticipation,
    WorkspaceCreatePage,
    WorkspaceList,
    WorkspaceDetail,
    Category,
    ApxMethod,
    ApxMethodDetail,

    Test,
    TestCase,
    TestCaseDetail,

    Mock,
    MockDetail,

    EvnMana,
    DataStructure,
    ApiStatus,
    ProjectFeature,
    ProjectRole,
    SystemFeature,
    SystemRole,
    MessageManagement,
    MessageSendType,
    MessageTemplate,
    MessageType,
    MessageUser, SysManage, LoginContent, Org, Usermgr,

} from './modules';
import {Redirect} from "react-router";
import RecentBrowing from "./modules/workspace/components/recentBrowing";
import PluginManage from "./modules/sysmgr/pluginManage/pluginManage";
import {Licence} from "doublekit-licence-ui";
import {Directory} from "doublekit-user-ui";
import {PluginDetail} from "doublekit-plugin-manage";
import WorkspaceDetailLayout from "./modules/workspaceDetail/workspaceDetailLayout";
import ApiContant from "./modules/category/components/ApiContant";
import TabsPage from "./modules/workspaceDetail/tabsPage";
import LayoutQuickTest from "./modules/quicktest/components/layoutQuickTest";
import TabsQuickTest from "./modules/quicktest/components/tabsQuickTest";
import TestdetailQuickTest from "./modules/quicktest/components/testdetailQuickTest";
import ApiInitPage from "./modules/category/components/apiInitPage";
import LoginOut from "./modules/header/loginOut";
import ElectronLoginContant from "./modules/login/electronLoginContant";
import {AuthResult} from "doublekit-eam-ui";

const routers =  [
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
                        component: RecentBrowing,
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
                        path: "/systemManagement/envMana",
                        key:'EvnMana',
                        exact: true,
                        component: EvnMana,
                    },
                    {
                        path: "/systemManagement/dataStructure",
                        key:'dataStucture',
                        exact: true,
                        component: DataStructure,
                    },
                    {
                        path: "/systemManagement/apistatus",
                        key:'apistatus',
                        exact: true,
                        component: ApiStatus,
                    },{
                        path: "/systemManagement/pluginmanage",
                        key:'pluginmanage',
                        component: PluginManage,
                    },
                    {
                        path: "/systemManagement",
                        key:'sysEnvMana',
                        exact: true,
                        render: () => <Redirect to={"/systemManagement/envMana"}/>,
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
                        path: "/workspacepage/detail",
                        exact: true,
                        key:'WorkspaceDetail',
                        component: WorkspaceDetail,
                    },
                    {
                        path: "/workspacepage/apis",
                        key:'apis',
                        component: ApiContant,
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
                                        component: ApiInitPage,
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
                    },
                    {
                        path:"/workspacepage",
                        key:'ridapidetail',
                        exact: true,
                        component: ()=><Redirect to='/workspacepage/detail'/>,
                    },
                    {
                        path: "/workspacepage/role",
                        key:'role',
                        exact: true,
                        component: WorkspaceRole,
                    },
                    {
                        path: "/workspacepage/workspacePrivilege",
                        key:'privilege',
                        exact: true,
                        component: WorkspacePrivilege,
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
