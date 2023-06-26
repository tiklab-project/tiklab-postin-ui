
import Home from '../home/Home';
import {Search, SearchResult} from '../common/header/search';

import {
    WorkspaceRole, WorkspacePrivilege, Workspace,  WorkspaceList,
    DetailIndex
} from '../workspace';

import { Category } from "../category";

import { ApxMethodDetail } from "../api/http/definition";

import{ Test, }from '../api/http/test';

import { Mock,MockDetail } from "../api/http/mock"

import {
    SystemContent, SysManage
} from '../setting'

import PageContent from "../common/header/PageContent";
import HeaderContent from '../common/header/HeaderContent'
import WorkspaceDetailLayout from "../workspace/common/WorkspaceDetailLayout";
import LayoutApiContent from "../api/http/definition/components/LayoutApiContent"

import LayoutQuickTest from "../quicktest/common/LayoutQuickTest";
import TabsQuickTest from "../quicktest/common/TabsQuickTest";
import TestdetailQuickTest from "../quicktest/components/TestdetailQuickTest";
import WorkspaceDetailInitPage from "../workspace/overview/WorkspaceOverViewPage";
import WorkspaceSettingMenu from "../workspace/setting/WorkspaceSettingMenu";
import LoginOut from "../common/header/LoginOut";
import LoginContent from "../login/LoginContent";

export {
    Home,PageContent,HeaderContent,
    Search, SearchResult,

    WorkspaceRole, WorkspacePrivilege,WorkspaceSettingMenu,
    Workspace,
    WorkspaceList,

    WorkspaceDetailLayout,LayoutApiContent,
    DetailIndex,
    Category, ApxMethodDetail,

    LayoutQuickTest,TabsQuickTest,TestdetailQuickTest,WorkspaceDetailInitPage,

    Test,

    Mock, MockDetail,

    SystemContent,SysManage,
    LoginOut,LoginContent,
}

