
import Home from './home/home';
import {Search, SearchResult} from './integration/search';

import {
    WorkspaceRole, WorkspacePrivilege, Workspace,WorkspaceRecent,
    WorkspaceCreate, WorkspaceJoin, WorkspaceInit, WorkspaceList,
    DetailIndex,WorkspaceFollow
} from './workspace';

import { Category } from "./category";

import { ApxMethod, ApxMethodDetail } from "./apxMethod";

import{ Test, TestCase, TestCaseDetail }from'./apitest';

import { Mock,MockDetail } from "./apimock"

import {
    AccountMember,SysManage, EvnMana, DataStructure, ApiStatus, Org, Usermgr,
    ProjectFeature, ProjectRole, SystemFeature, SystemRole, MessageManagement,
    MessageSendType, MessageTemplate, MessageType, MessageUser,
} from './sysmgr/index'

import PageContent from "./header/pageContent";
import HeaderContent from './header/headerContent'
import PluginManage from "./sysmgr/pluginManage/pluginManage";
import RecentBrowing from "./workspace/components/recentBrowing";
import WorkspaceDetailLayout from "./workspaceDetail/workspaceDetailLayout";
import LayoutApiContent from "./apxMethod/http/components/layoutApiContent"
import TabsPage from "./workspaceDetail/tabsPage";
import LayoutQuickTest from "./quicktest/components/layoutQuickTest";
import TabsQuickTest from "./quicktest/components/tabsQuickTest";
import TestdetailQuickTest from "./quicktest/components/testdetailQuickTest";
import WorkspaceDetailInitPage from "./workspaceDetail/workspaceDetailInitPage";
import WorkspaceSetting from "./integration/workspaceSetting/workspaceSetting";
import LoginOut from "./header/loginOut";
import LoginContent from "./login/loginContent";
import ElectronLoginContant from "./login/electronLoginContant";

import WorkspaceWidget from "./workspaceWidget/components/workspaceWidget";
import {WIDGET_STORE,WidgetStore} from "./workspaceWidget/store/widgetStore";

export {
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
    WIDGET_STORE,WidgetStore,
}

