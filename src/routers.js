
import React from 'react'
import PortalHeader from "./modules/header/portalContent"

import {
    Home, SearchResult,

    WorkspaceRole, WorkspacePrivilege, Workspace,
    WorkspaceDetailLayout,
    LayoutApiContent, TabsPage, LayoutQuickTest, TabsQuickTest,  WorkspaceDetailInitPage,
    Category, ApxMethod, ApxMethodDetail,

    Test, TestCase,
    Mock, MockDetail,

    SystemContent,  DataStructure, ApiStatus,
    ProjectFeature, ProjectRole,
    SystemFeature, SystemRole, PluginManage,
    MessageManagement, MessageSendType, MessageTemplate, MessageType, MessageUser,
    LoginOut, ElectronLoginContant, WorkspaceSettingMenu,
} from './modules';

import {Redirect} from "react-router";
import {AuthResult} from "tiklab-eam-ui";
import PluginDetailPage from "./modules/sysmgr/pluginManage/pluginDetail";
import TestBoxQuickTest from "./modules/quicktest/components/testBoxQuickTest";
import TestCaseBox from "./modules/apitest/testCase/components/testCaseBox";
import TestBox from "./modules/apitest/test/components/testBox";
import LogList from "./modules/sysmgr/log/Log";
import TaskList from "./modules/sysmgr/todo/todo";
import TodoTemp from "./modules/sysmgr/todo/todoTempList";
import MyTodo from "./modules/sysmgr/todo/myTodo";
import LogTemplate from "./modules/sysmgr/log/LogTemplate";
import {Directory, OrgaList, UserList} from "tiklab-user-ui";
import AccountMember from "./modules/sysmgr/accountMember/accountMember";
import LoginContent from "./modules/login/loginContent";
import {WidgetWork} from "tiklab-widget-ui";
import WorkspaceSetting from "./modules/integration/workspaceSetting/workspaceSetting";

const routers =  [
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
                path: "/workspacePage",
                component: Workspace,
                key:'workspacePage',
            },
            {
                path:'/systemManagement',
                key:'systemManagement',
                component:SystemContent,
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
                        path: "/systemManagement/plugin",
                        key:'plugin',
                        component: PluginManage,
                    },
                    {
                        path: "/systemManagement/plugindetail",
                        key:'plugindetail',
                        exact: true,
                        component: PluginDetailPage,
                    },{
                        path: "/systemManagement/log",
                        key:'log',
                        exact: true,
                        component: LogList,
                    },{
                        path: "/systemManagement/logTemplate",
                        key:'logTemplate',
                        exact: true,
                        component: LogTemplate,
                    },{
                        path: "/systemManagement/taskList",
                        key:'todo',
                        exact: true,
                        component: TaskList,
                    },{
                        path: "/systemManagement/todoTemp",
                        key:'todoTemp',
                        exact: true,
                        component: TodoTemp,
                    },{
                        path: "/systemManagement/myTodo",
                        key:'myTodo',
                        exact: true,
                        component: MyTodo,
                    }, {
                        path: "/systemManagement/org",
                        key:'org',
                        exact: true,
                        component: OrgaList,
                    },
                    {
                        path: "/systemManagement/user",
                        key:'user',
                        exact: true,
                        render:(props)=>{

                            return(
                                <UserList {...props} bgroup={'postin'}/>
                            )
                        }
                    },
                    {
                        path: "/systemManagement/authConfig",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false}/>,
                    },
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
                path: "/MessageUser",
                key:'MessageUser',
                exact: true,
                component: MessageUser,
            },
            {
                path: "/workbench",
                key:'user',
                exact: true,
                render: () => <WidgetWork bgroup={"postin"}/>,
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
                                                component: TestBox,
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
                                                component: TestCaseBox,
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
                                        component: TestBoxQuickTest,
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
