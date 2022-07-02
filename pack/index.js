/*
 * @Description:用于打包
 * @LastEditTime: 2021-05-31 13:29:01
 */
import { stores as apiboxStore  } from './components/stores';
import routers from './components/routers';
import App from "./components/app";

import {
    Home,PageContent,HeaderContent,
    Search, SearchResult,

    WorkspaceRole, WorkspacePrivilege,WorkspaceSetting,
    Workspace,RecentBrowing,WorkspaceRecent,WorkspaceFollow,
    WorkspaceCreate, WorkspaceJoin, WorkspaceInit,
    WorkspaceList,

    WorkspaceDetailLayout,LayoutApiContent,TabsPage,
    DetailIndex, WorkspaceDetail,
    Category, ApxMethod, ApxMethodDetail,

    LayoutQuickTest,TabsQuickTest,TestdetailQuickTest,WorkspaceDetailInitPage,

    Test, TestCase, TestCaseDetail,

    Mock, MockDetail,

    SysManage,AccountMember,
    EvnMana, DataStructure,ApiStatus,
    Usermgr, Org,
    ProjectFeature, ProjectRole, SystemFeature, SystemRole,
    MessageManagement, MessageSendType, MessageTemplate, MessageType, MessageUser,
    PluginManage,
    LoginOut,LoginContent,
    ElectronLoginContant,

    WorkspaceWidget,
} from "./components/modules/index"


export {
    apiboxStore, routers, App,
    Home,PageContent,HeaderContent,
    Search, SearchResult,

    WorkspaceRole, WorkspacePrivilege,WorkspaceSetting,
    Workspace,RecentBrowing,WorkspaceRecent,WorkspaceFollow,
    WorkspaceCreate, WorkspaceJoin, WorkspaceInit,
    WorkspaceList,

    WorkspaceDetailLayout,LayoutApiContent,TabsPage,
    DetailIndex,
    Category, ApxMethod, ApxMethodDetail,

    LayoutQuickTest,TabsQuickTest,TestdetailQuickTest,WorkspaceDetailInitPage,

    Test, TestCase, TestCaseDetail,

    Mock, MockDetail,

    SysManage,AccountMember,
    EvnMana, DataStructure,ApiStatus,
    Usermgr, Org,
    ProjectFeature, ProjectRole, SystemFeature, SystemRole,
    MessageManagement, MessageSendType, MessageTemplate, MessageType, MessageUser,
    PluginManage,
    LoginOut,LoginContent,
    ElectronLoginContant,

    WorkspaceWidget,
}
