
import React from 'react'
import PortalHeader from './modules/header/portalHeader';
import {AuthConfig, Directory} from 'doublekit-user-ui'
import {
    Home,
    SearchResult,

    WorkspaceSetting,
    WorkspaceRole,
    WorkspacePrivilege,
    Workspace, WorkspaceInitPage,
    WorkspaceParticipation,
    WorkspaceCreatePage,
    WorkspaceList,
    WorkspaceDetail,
    DetailIndex,
    Category,
    ApxMethod,
    ApxMethodDetail,

    Test,
    TestCase,
    TestCaseDetail,
    TestInstance,

    Mock,
    MockDetail,

    SystemManagement,
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
    MessageUser, Org, Usermgr,

} from './modules';
import {Redirect} from "react-router";
import RecentBrowing from "./modules/workspace/components/recentBrowing";


const routers =  [
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
                path: "/",
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
                path: "/workspaceSet",
                component: WorkspaceSetting,
                key:'setting',
                routes:[
                    {
                        path: "/workspaceSet/role",
                        key:'role',
                        exact: true,
                        component: WorkspaceRole,
                    },
                    {
                        path: "/workspaceSet/workspacePrivilege",
                        key:'privilege',
                        exact: true,
                        component: WorkspacePrivilege,
                    },
                    {
                        path: "/workspaceSet",
                        key:'ridrole',
                        component: ()=><Redirect to='/workspaceSet/role'/>,
                    },
                ]
            },
            {
                path:'/systemManagement',
                key:'systemManagement',
                component:SystemManagement,
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
                path: "/MessageUser",
                key:'MessageUser',
                exact: true,
                component: MessageUser,
            },
            {
                component: DetailIndex,
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
                        path: "/workspacepage/apis/detail/category",
                        exact: true,
                        key:'Category',
                        component: Category,
                    },

                    {
                        path:"/workspacepage/apis/detail/interface",
                        component: ApxMethod,
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
                                path:"/workspacepage/apis/detail/interface/instance",
                                exact: true,
                                key:'instance',
                                component: TestInstance,
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
                                key:'ridapidetail',
                                component: ()=><Redirect to='/workspacepage/apis/detail/interface/detail'/>,
                            },

                        ]
                    },
                    {
                        path:"/workspacepage",
                        key:'ridapidetail',
                        exact: true,
                        component: ()=><Redirect to='/workspacepage/detail'/>,
                    },


                ]
            },
        ]
    },
];

export default routers
