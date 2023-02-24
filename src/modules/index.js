
import Home from './integration/home/home';
import {Search, SearchResult} from './integration/search';

import {
    WorkspaceRole, WorkspacePrivilege, Workspace,  WorkspaceList,
    DetailIndex
} from './workspace';

import { Category } from "./category";

import { ApxMethodDetail } from "./apxMethod";

import{ Test, TestCase, TestCaseDetail }from'./apitest';

import { Mock,MockDetail } from "./apimock"

import {
    SystemContent, SysManage,DataStructure, ApiStatus,
} from './sysmgr/index'

import PageContent from "./integration/header/pageContent";
import HeaderContent from './integration/header/headerContent'
import WorkspaceDetailLayout from "./workspaceDetail/workspaceDetailLayout";
import LayoutApiContent from "./apxMethod/http/components/layoutApiContent"
import TabsPage from "./workspaceDetail/tabsPage";
import LayoutQuickTest from "./quicktest/components/layoutQuickTest";
import TabsQuickTest from "./quicktest/components/tabsQuickTest";
import TestdetailQuickTest from "./quicktest/components/testdetailQuickTest";
import WorkspaceDetailInitPage from "./workspaceDetail/workspaceDetailInitPage";
import WorkspaceSettingMenu from "./integration/workspaceSetting/workspaceSettingMenu";
import LoginOut from "./integration/header/loginOut";
import LoginContent from "./integration/login/loginContent";
import ElectronLoginContant from "./integration/login/electronLoginContant";

export {
    Home,PageContent,HeaderContent,
    Search, SearchResult,

    WorkspaceRole, WorkspacePrivilege,WorkspaceSettingMenu,
    Workspace,
    WorkspaceList,

    WorkspaceDetailLayout,LayoutApiContent,TabsPage,
    DetailIndex,
    Category, ApxMethodDetail,

    LayoutQuickTest,TabsQuickTest,TestdetailQuickTest,WorkspaceDetailInitPage,

    Test, TestCase, TestCaseDetail,

    Mock, MockDetail,

    SystemContent,SysManage,
    DataStructure,ApiStatus,
    LoginOut,LoginContent,
    ElectronLoginContant,


}

