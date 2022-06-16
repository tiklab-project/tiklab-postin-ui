
import WorkspaceRole from '../integration/workspaceRole/workspaceRole';
import WorkspacePrivilege from '../integration/workspacePrivilege/workspacePrivilege';

import Workspace from './components/workspace';
import WorkspaceList from './components/workspaceList';
import WorkspaceDetail from '../workspaceDetail/workspaceDetailPage';
import DetailIndex from '../common/rightContent';
import { WORKSPACE_STORE, WorkspaceStore } from './store/workspaceStore';
import WorkspaceInitPage from "./components/workspaceInitPage";
import WorkspaceCreatePage from "./components/workspaceCreatePage";
import WorkspaceParticipation from "./components/workspaceParticipation";
import WorkspaceRecent from "./components/workspaceRecent"

import {WORKSPACE_RECENT_STORE,WorkspaceRecentStore} from "./store/workspaceRecentStore";

export {
    WorkspacePrivilege, WorkspaceRole,

    // 空间
    Workspace, WorkspaceInitPage, WorkspaceList, WorkspaceDetail, DetailIndex,
    WorkspaceRecent,
    WorkspaceCreatePage,WorkspaceParticipation,
    WORKSPACE_STORE, WorkspaceStore,
    WORKSPACE_RECENT_STORE,WorkspaceRecentStore
}
