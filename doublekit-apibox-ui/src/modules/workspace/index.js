
import WorkspaceRole from '../integration/workspaceRole/workspaceRole';
import WorkspacePrivilege from '../integration/workspacePrivilege/workspacePrivilege';

import Workspace from './components/workspace';
import WorkspaceList from './components/workspaceList';
import WorkspaceDetail from '../workspaceDetail/workspaceDetailPage';
import DetailIndex from '../category/components/ApiContant';
import { WORKSPACE_STORE, WorkspaceStore } from './store/workspaceStore';
import WorkspaceInitPage from "./components/workspaceInitPage";
import WorkspaceCreatePage from "./components/workspaceCreatePage";
import WorkspaceParticipation from "./components/workspaceParticipation";

export {
    WorkspacePrivilege, WorkspaceRole,

    // 空间
    Workspace, WorkspaceInitPage, WorkspaceList, WorkspaceDetail, DetailIndex,
    WorkspaceCreatePage,WorkspaceParticipation,
    WORKSPACE_STORE, WorkspaceStore,

}
