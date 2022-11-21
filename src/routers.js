
import React from 'react'
import PortalHeader from "./modules/header/portalContent"

import {
    Home, SearchResult,

    WorkspaceRole, WorkspacePrivilege, Workspace,
    WorkspaceDetailLayout,
    LayoutApiContent, TabsPage, LayoutQuickTest, TabsQuickTest,  WorkspaceDetailInitPage,
    Category, ApxMethod, ApxMethodDetail,

    TestCase,
    Mock, MockDetail,

    SystemContent,  DataStructure,

    LoginOut, ElectronLoginContant, WorkspaceSettingMenu,
} from './modules';

import {Redirect} from "react-router";
import {AuthResult} from "tiklab-eam-ui";
import TestBoxQuickTest from "./modules/quicktest/components/testBoxQuickTest";
import TestCaseBox from "./modules/apitest/testCase/components/testCaseBox";
import TestBox from "./modules/apitest/test/components/testBox";
import {Directory, OrgaList, UserList} from "tiklab-user-ui";
import LoginContent from "./modules/login/loginContent";
import {WidgetWork} from "tiklab-widget-ui";
import WorkspaceSetting from "./modules/integration/workspaceSetting/workspaceSetting";
import {MessageManagement, MessageSendType, MessageTemplate, MessageType} from "tiklab-message-ui";
import {ProjectFeatureList, ProjectRoleList, SystemFeatureList, SystemRoleList} from "tiklab-privilege-ui";
import {MyTodoTask, TaskList, TodoTempList} from "tiklab-todotask-ui";
import {LogList, LogTemplateList, LogTypeList} from "tiklab-oplog-ui";
import {PluginDetail, PluginList} from "tiklab-plugin-ui";
import DynamicDetail from "./modules/home/dynamicDetail";
import Version from "./modules/sysmgr/version/version";
import StructureDetail from "./modules/sysmgr/dataStructure/components/StructureDetail";

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
                path: "/dynamic",
                component: DynamicDetail,
                exact: true,
                key:'DynamicDetail',
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
                    //成员与部门
                    {
                        path: "/systemManagement/org",
                        key:'org',
                        exact: true,
                        render:(props)=> <OrgaList {...props} bgroup={'postin'}/>
                    },{
                        path: "/systemManagement/user",
                        key:'user',
                        exact: true,
                        render:(props)=>{
                            return <UserList {...props} bgroup={'postin'}/>
                        }
                    },{
                        path: "/systemManagement/authConfig",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false}/>,
                    },
                    //权限
                    {
                        path: "/systemManagement/systemRole",
                        key:'SystemRole',
                        render: () => <SystemRoleList group={'system'} bgroup={"postin"}/>,
                    },
                    //消息
                    {
                        path: "/systemManagement/messageManagement",
                        key:'MessageManagement',
                        exact: true,
                        render:()=> <MessageManagement bgroup={"postin"}/>

                    },
                    {
                        path: "/systemManagement/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"postin"}/>

                    },
                    //代办
                    {
                        path: "/systemManagement/myTodo",
                        key:'myTodo',
                        exact: true,
                        render:(props)=> <MyTodoTask {...props} bgroup={"postin"}/>
                    },
                    //插件
                    {
                        path: "/systemManagement/plugin",
                        key:'plugin',
                        render:(props)=> <PluginList {...props}  detailRouter={"/systemManagement/plugindetail"}/>,
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
                        render:(props)=>  <LogList {...props} bgroup={"postin"}/>,
                    },
                    //版本
                    {
                        path: "/systemManagement/version",
                        key:'version',
                        exact: true,
                        component:Version

                    },
                    {
                        path: "/systemManagement/baseSystemRole",
                        exact: true,
                        render: () => <SystemRoleList isBase={true} group={'system'} bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        render: () => <SystemFeatureList bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        render: (props) => <ProjectFeatureList {...props} bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/role",
                        key:'ProjectRole',
                        exact: true,
                        render: (props) => <ProjectRoleList isBase={true} {...props} bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/messageTemplate",
                        key:'MessageTemplate',
                        exact: true,
                        render:()=> <MessageTemplate bgroup={"postin"}/>

                    },
                    {
                        path: "/systemManagement/messageType",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageType bgroup={"postin"}/>

                    },
                    {
                        path: "/systemManagement/logTemplate",
                        key:'logTemplate',
                        exact: true,
                        render:(props)=>  <LogTemplateList {...props} bgroup={"postin"}/>,
                    },{
                        path: "/systemManagement/logType",
                        key:'logTemplate',
                        exact: true,
                        render:()=>  <LogTypeList bgroup={"postin"}/>,
                    },{
                        path: "/systemManagement/taskList",
                        key:'todo',
                        exact: true,
                        render:(props)=> <TaskList {...props} bgroup={"postin"}/>,
                    },{
                        path: "/systemManagement/todoTemp",
                        key:'todoTemp',
                        exact: true,
                        render:(props)=> <TodoTempList {...props} bgroup={"postin"}/>,
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
                                path: "/workspace/apis/detail",
                                key:'TabsPage',
                                component: TabsPage,
                                routes:[
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
                    {
                        path:"/workspace",
                        key:'ridapidetail',
                        exact: true,
                        component: ()=><Redirect to='/workspace/overview'/>,
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
