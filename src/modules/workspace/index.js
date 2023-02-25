
import WorkspaceRole from './workspaceSetting/workspaceRole';
import WorkspacePrivilege from './workspaceSetting/workspacePrivilege';

import Workspace from './workspace/components/workspace';
import WorkspaceList from './workspace/components/workspaceList';
import DetailIndex from '../common/rightContent';
import { WORKSPACE_STORE, WorkspaceStore } from './workspace/store/workspaceStore';
import {WORKSPACE_RECENT_STORE,WorkspaceRecentStore} from "./workspace/store/workspaceRecentStore";
import {WORKSPACE_FOLLOW_STORE,WorkspaceFollowStore} from "./workspace/store/workspaceFollowStore";

export {
    WorkspacePrivilege, WorkspaceRole,

    // 空间
    Workspace, WorkspaceList, DetailIndex,
    WORKSPACE_STORE, WorkspaceStore,
    WORKSPACE_RECENT_STORE,WorkspaceRecentStore,
    WORKSPACE_FOLLOW_STORE,WorkspaceFollowStore
}
