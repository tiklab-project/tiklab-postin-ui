
import WorkspaceRole from './workspaceSetting/WorkspaceRole';
import WorkspacePrivilege from './workspaceSetting/WorkspacePrivilege';

import Workspace from './workspace/components/Workspace';
import WorkspaceList from './workspace/components/WorkspaceList';
import DetailIndex from '../common/RightContent';
import { WORKSPACE_STORE, WorkspaceStore } from './workspace/store/WorkspaceStore';
import {WORKSPACE_RECENT_STORE,WorkspaceRecentStore} from "./workspace/store/WorkspaceRecentStore";
import {WORKSPACE_FOLLOW_STORE,WorkspaceFollowStore} from "./workspace/store/WorkspaceFollowStore";

export {
    WorkspacePrivilege, WorkspaceRole,

    // 空间
    Workspace, WorkspaceList, DetailIndex,
    WORKSPACE_STORE, WorkspaceStore,
    WORKSPACE_RECENT_STORE,WorkspaceRecentStore,
    WORKSPACE_FOLLOW_STORE,WorkspaceFollowStore
}
