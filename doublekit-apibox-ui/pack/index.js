/*
 * @Description:用于打包
 * @LastEditTime: 2021-05-31 13:29:01
 */
import { stores as apiboxStore  } from './components/stores';
import routers from './components/routers';
import saasrouters from './components/saasrouters';
import App from "./components/app";
import {
    Home,PortalHeader,HeaderContent,
    Search, SearchResult,

    WorkspaceRole, WorkspacePrivilege,
    Workspace,WorkspaceInitPage,WorkspaceCreatePage,RecentBrowing,
    WorkspaceParticipation,
    WorkspaceList,

    WorkspaceDetailLayout,ApiContant,TabsPage,
    DetailIndex, WorkspaceDetail,
    Category, ApxMethod, ApxMethodDetail,

    LayoutQuickTest,TabsQuickTest,TestdetailQuickTest,ApiInitPage,

    Test, TestCase, TestCaseDetail,

    Mock, MockDetail,

    SysManage,
    EvnMana, DataStructure,ApiStatus,
    Usermgr, Org,
    ProjectFeature, ProjectRole, SystemFeature, SystemRole,
    MessageManagement, MessageSendType, MessageTemplate, MessageType, MessageUser,
    PluginManage,
    LoginOut,LoginContent,
    ElectronLoginContant,
} from "./components/modules/index"


export {
    apiboxStore, routers, saasrouters, App,
    Home,PortalHeader,HeaderContent,
    Search, SearchResult,

    WorkspaceRole, WorkspacePrivilege,
    Workspace,WorkspaceInitPage,WorkspaceCreatePage,RecentBrowing,
    WorkspaceParticipation,
    WorkspaceList,

    WorkspaceDetailLayout,ApiContant,TabsPage,
    DetailIndex, WorkspaceDetail,
    Category, ApxMethod, ApxMethodDetail,

    LayoutQuickTest,TabsQuickTest,TestdetailQuickTest,ApiInitPage,

    Test, TestCase, TestCaseDetail,

    Mock, MockDetail,

    SysManage,
    EvnMana, DataStructure,ApiStatus,
    Usermgr, Org,
    ProjectFeature, ProjectRole, SystemFeature, SystemRole,
    MessageManagement, MessageSendType, MessageTemplate, MessageType, MessageUser,
    PluginManage,
    LoginOut,LoginContent,
    ElectronLoginContant,
}
