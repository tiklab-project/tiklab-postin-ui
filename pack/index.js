/*
 * @Description:用于打包
 * @LastEditTime: 2021-05-31 13:29:01
 */
import { stores as postinStore  } from './components/stores';
import routers ,{
    Home,
    SearchResult,
    WorkspaceRole,
    WorkspacePrivilege,
    Workspace,
    WorkspaceDetailLayout,
    LayoutApiContent,
    LayoutQuickTest,
    WorkspaceDetailInitPage,
    Category,
    ApxMethodDetail,
    Mock,
    MockDetail,
    SystemContent,
    LoginOut,
    WorkspaceSettingMenu,
    TestBoxQuickTest,
    TestBox,
    LoginContent,
    WorkspaceSetting,
    DynamicDetail,
    Version,
    StructureDetail,
    Share,
    ShareMain,
    ApiDocument,
    ApiInitPage,
    DataStructure,
    WorkspaceEdit,
}from './components/routers';
import App from "./components/app";
import AsyncComponent from "./components/common/lazy/SyncComponent";

import {
    PageContent,HeaderContent,

    SysManage,

    TabsQuickTest,
    Test, TestdetailQuickTest,TestCaseDetail,
} from "./components/container/index"


export {
    postinStore, routers, App,
    Home,PageContent,HeaderContent,
    LayoutQuickTest,TabsQuickTest,
    Test, TestdetailQuickTest,TestCaseDetail,

    SysManage,
    LoginOut,LoginContent,

    AsyncComponent,

    SearchResult,
    WorkspaceRole,
    WorkspacePrivilege,
    Workspace,
    WorkspaceDetailLayout,
    LayoutApiContent,
    WorkspaceDetailInitPage,
    Category,
    ApxMethodDetail,
    Mock,
    MockDetail,
    SystemContent,
    WorkspaceSettingMenu,
    TestBoxQuickTest,
    TestBox,
    WorkspaceSetting,
    DynamicDetail,
    Version,
    StructureDetail,
    Share,
    ShareMain,
    ApiDocument,
    ApiInitPage,
    DataStructure,
    WorkspaceEdit,
}
