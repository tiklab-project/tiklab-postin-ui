/*
 * @Description: 空间store
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-24 09:53:09
 */

import { observable,  action } from "mobx";
import { 
	deleteWorkspaceRecent,
	createWorkspaceRecent, 
    findWorkspaceRecent, 
	updateWorkspaceRecent,
	workspaceRecent,
	findWorkspaceRecentList,
} from '../api/workspaceRecentApi';

export class WorkspaceRecentStore {
	@observable recentList = [];


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

	@action
	findWorkspaceRecentList = async (value) => {
		this.params = {
			...value,
			orderParams:[{name:'updateTime', orderType:'desc'}],
		}
		const res = await findWorkspaceRecentList(this.params)

		if(res.code === 0 ) {
			this.recentList = res.data;
			return res;
		}
	}

	@action
	findWorkspaceRecentPage = async (value) => {
		this.pageParams = {
			orderParams:[{name:'updateTime', orderType:'desc'}],
			...value
		}
		const res = await findWorkspaceRecentPage(this.pageParams)
		if(res.code === 0 ) {
			this.recentList = res.data.dataList;
			this.totalRecord = res.data.totalRecord;
			return res;
		}
	}




}

export const WORKSPACE_RECENT_STORE = 'workspaceRecentStore';

