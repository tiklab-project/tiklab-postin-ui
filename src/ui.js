import AsyncComponent from "./common/lazy/SyncComponent";


const Home = AsyncComponent(() => import('./home/Home'));
const SearchResult = AsyncComponent(() => import('./common/header/search'));
const WorkspaceRole = AsyncComponent(() => import('./workspace/setting/WorkspaceRole'));
const WorkspacePrivilege = AsyncComponent(() => import('./workspace/setting/WorkspacePrivilege'));
const Workspace = AsyncComponent(() => import('./workspace/workspace/components/Workspace'));
const WorkspaceDetailLayout = AsyncComponent(() => import("./workspace/common/WorkspaceDetailLayout"));
const LayoutApiContent = AsyncComponent(() => import("./api/http/definition/components/LayoutApiContent"));
const LayoutQuickTest = AsyncComponent(() => import("./quicktest/common/LayoutQuickTest"));
const WorkspaceDetailInitPage = AsyncComponent(() => import("./workspace/overview/WorkspaceOverViewPage"));
const Category = AsyncComponent(() => import("./api/http/definition/components/HttpList"));
const ApxMethodDetail = AsyncComponent(() => import("./api/http/definition/components/ApxMethodEditPage"));
const Mock = AsyncComponent(() => import("./api/http/mock/components/Mock"));
const MockDetail = AsyncComponent(() => import("./api/http/mock/components/MockDetail"));
const SystemContent = AsyncComponent(() => import("./setting"));
const LoginOut = AsyncComponent(() => import("./common/header/LoginOut"));
const WorkspaceSettingMenu = AsyncComponent(() => import("./workspace/setting/WorkspaceSettingMenu"));
const TestBoxQuickTest = AsyncComponent(() => import("./quicktest/components/TestBoxQuickTest"));
const TestBox = AsyncComponent(() => import( "./api/http/test/test/components/ApiTestPage"));
const LoginContent = AsyncComponent(() => import("./login/LoginContent"));
const WorkspaceSetting = AsyncComponent(() => import("./workspace/setting/WorkspaceSetting"));
const DynamicDetail = AsyncComponent(() => import("./home/DynamicDetail"));
const Version = AsyncComponent(() => import("./setting/version/Version"));
const StructureDetail = AsyncComponent(() => import("./support/dataStructure/components/StructureDetail"));
const Share = AsyncComponent(() => import("./api/http/document/components/Share"));
const ShareMain = AsyncComponent(() => import("./api/http/document/components/ShareMain"));
const ApiDocument = AsyncComponent(() => import("./api/http/definition/components/ApiDocumentPage"));
const ApiInitPage = AsyncComponent(() => import("./workspace/common/ApiInitPage"));
const DataStructure = AsyncComponent(() => import("./support/dataStructure/components/DataStructure"));
const WorkspaceEdit = AsyncComponent(() => import("./workspace/workspace/components/WorkspaceEdit"));


export {
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
}