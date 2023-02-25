
import Home from './home/home/home';
import {Search, SearchResult} from './home/search';

import {
    WorkspaceRole, WorkspacePrivilege, Workspace,  WorkspaceList,
    DetailIndex
} from './workspace';

import { Category } from "./category";

import { ApxMethodDetail } from "./api/http/definition";

import{ Test, TestCase, TestCaseDetail }from './api/http/test';

import { Mock,MockDetail } from "./api/http/mock"

import {
    SystemContent, SysManage
} from './setting'

import PageContent from "./home/header/pageContent";
import HeaderContent from './home/header/headerContent'
import WorkspaceDetailLayout from "./workspace/workspaceDetail/workspaceDetailLayout";
import LayoutApiContent from "./api/http/definition/components/layoutApiContent"
import TabsPage from "./workspace/workspaceDetail/tabsPage";
import LayoutQuickTest from "./quicktest/components/layoutQuickTest";
import TabsQuickTest from "./quicktest/components/tabsQuickTest";
import TestdetailQuickTest from "./quicktest/components/testdetailQuickTest";
import WorkspaceDetailInitPage from "./workspace/workspaceDetail/workspaceDetailInitPage";
import WorkspaceSettingMenu from "./workspace/workspaceSetting/workspaceSettingMenu";
import LoginOut from "./home/header/loginOut";
import LoginContent from "./home/login/loginContent";
import ElectronLoginContant from "./home/login/electronLoginContant";

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
    LoginOut,LoginContent,
    ElectronLoginContant,


}

