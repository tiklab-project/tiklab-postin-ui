
import Home from '../home/home/Home';
import {Search, SearchResult} from '../home/search';

import {
    WorkspaceRole, WorkspacePrivilege, Workspace,  WorkspaceList,
    DetailIndex
} from '../workspace';

import { Category } from "../category";

import { ApxMethodDetail } from "../api/http/definition";

import{ Test, TestCase, TestCaseDetail }from '../api/http/test';

import { Mock,MockDetail } from "../api/http/mock"

import {
    SystemContent, SysManage
} from '../setting'

import PageContent from "../home/header/PageContent";
import HeaderContent from '../home/header/HeaderContent'
import WorkspaceDetailLayout from "../workspace/workspaceDetail/WorkspaceDetailLayout";
import LayoutApiContent from "../api/http/definition/components/LayoutApiContent"
import TabsPage from "../workspace/workspaceDetail/TabsPage";
import LayoutQuickTest from "../quicktest/components/LayoutQuickTest";
import TabsQuickTest from "../quicktest/components/TabsQuickTest";
import TestdetailQuickTest from "../quicktest/components/TestdetailQuickTest";
import WorkspaceDetailInitPage from "../workspace/workspaceDetail/WorkspaceDetailInitPage";
import WorkspaceSettingMenu from "../workspace/workspaceSetting/WorkspaceSettingMenu";
import LoginOut from "../home/header/LoginOut";
import LoginContent from "../home/login/LoginContent";
import ElectronLoginContant from "../home/login/ElectronLoginContant";

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

