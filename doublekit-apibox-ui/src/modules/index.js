
import Home from './home/home';
import {Search, SearchResult} from './integration/search';

import {
    WorkspaceRole, WorkspacePrivilege, Workspace,
    WorkspaceCreatePage, WorkspaceParticipation, WorkspaceInitPage, WorkspaceList,
    DetailIndex, WorkspaceDetail,
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

import PortalHeader from './header/portalHeader.js';
import HeaderContent from './header/headerContent'
import PluginManage from "./sysmgr/pluginManage/pluginManage";
import RecentBrowing from "./workspace/components/recentBrowing";
import WorkspaceDetailLayout from "./workspaceDetail/workspaceDetailLayout";
import RightContent from "./common/rightContent";
import LayoutApiContent from "./apxMethod/http/components/layoutApiContent"
import TabsPage from "./workspaceDetail/tabsPage";
import LayoutQuickTest from "./quicktest/components/layoutQuickTest";
import TabsQuickTest from "./quicktest/components/tabsQuickTest";
import TestdetailQuickTest from "./quicktest/components/testdetailQuickTest";
import ApiInitPage from "./category/components/apiInitPage";
import WorkspaceSetting from "./integration/workspaceSetting/workspaceSetting";
import LoginOut from "./header/loginOut";
import LoginContent from "./login/loginContent";
import ElectronLoginContant from "./login/electronLoginContant";



export {
    Home,PortalHeader,HeaderContent,
    Search, SearchResult,

    WorkspaceRole, WorkspacePrivilege,WorkspaceSetting,
    Workspace,WorkspaceInitPage,WorkspaceCreatePage,RecentBrowing,
    WorkspaceParticipation,
    WorkspaceList,

    WorkspaceDetailLayout,LayoutApiContent,TabsPage,
    DetailIndex, WorkspaceDetail,
    Category, ApxMethod, ApxMethodDetail,

    LayoutQuickTest,TabsQuickTest,TestdetailQuickTest,ApiInitPage,

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
}

