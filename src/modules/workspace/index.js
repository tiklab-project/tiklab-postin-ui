
import WorkspaceRole from '../integration/workspaceRole/workspaceRole';
import WorkspacePrivilege from '../integration/workspacePrivilege/workspacePrivilege';

import Workspace from './components/workspace';
import WorkspaceList from './components/workspaceList';
import DetailIndex from '../common/rightContent';
import { WORKSPACE_STORE, WorkspaceStore } from './store/workspaceStore';
import WorkspaceInit from "./components/workspaceInit";

import {WORKSPACE_RECENT_STORE,WorkspaceRecentStore} from "./store/workspaceRecentStore";
import {WORKSPACE_FOLLOW_STORE,WorkspaceFollowStore} from "./store/workspaceFollowStore";

export {
    WorkspacePrivilege, WorkspaceRole,

    // 空间
    Workspace, WorkspaceInit, WorkspaceList, DetailIndex,
    WORKSPACE_STORE, WorkspaceStore,
    WORKSPACE_RECENT_STORE,WorkspaceRecentStore,
    WORKSPACE_FOLLOW_STORE,WorkspaceFollowStore
}
