import { observable,  action } from "mobx";
import {
	workspaceRecent,
	findWorkspaceRecentList,
} from '../api/workspaceRecentApi';

/**
 * 最近访问的空间 store
 */
export class WorkspaceRecentStore {
	@observable recentList = [];


	/**
	 * 设置最近访问的空间
	 */
	@action
	workspaceRecent = async (values) => {
		let params = {
			orderParams:[{name:'updateTime', orderType:'desc'}],
			...values
		}
		const res = await workspaceRecent(params);
		if(res.code === 0 ) {
			return res.data;
		}
	}




}

export const WORKSPACE_RECENT_STORE = 'workspaceRecentStore';

