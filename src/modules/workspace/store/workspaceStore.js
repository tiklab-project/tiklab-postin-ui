/*
 * @Description: 空间store
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-24 09:53:09
 */

import { observable,  action } from "mobx";
import { 
	deleteWorkspace,
	createWorkspace, 
    findWorkspace, 
	updateWorkspace, 
	findWorkspacePage,
	findWorkspaceList,
	findWorkspaceJoinList
} from '../api/workspaceApi';

export class WorkspaceStore {
	@observable workspaceList = [];
	@observable workspaceId ='';
	@observable workspaceName = '';
	@observable	totalRecord = "";
	@observable params;
	@observable pageParams;
	@observable length;

	//获取带分页列表的数据/
	@action
	findWorkspacePage = async (value) => {
		this.pageParams = {
			orderParams:[{name:'workspaceName', orderType:'asc'}],
			...value
		}
		const res = await findWorkspacePage(this.pageParams)
		if(res.code === 0 ) {
			this.workspaceList = res.data.dataList;
			this.totalRecord = res.data.totalRecord;
			return res;
		}
	}

	@action
	findWorkspaceList = async (userId) => {
		this.params = {
			userId:userId,
			orderParams:[{name:'workspaceName', orderType:'asc'}],
		}
		const res = await findWorkspaceList(this.params)
		if(res.code === 0 ) {
			this.workspaceList = res.data;
			this.length = res.data.length;
			return res;
		}
	}


	@action
	findWorkspaceJoinList = async (userId) => {
		this.params = {userId:userId}
		const res = await findWorkspaceJoinList(this.params)
		if(res.code === 0 ) {
			this.workspaceList = res.data;
			this.length = res.data.length;
			return res;
		}
	}


	// 删除空间
	@action
	deleteWorkspace = async (id) => {
		const param = new FormData();
		param.append('id', id)
		const res = await deleteWorkspace(param)
		if(res.code === 0){
			this.findWorkspacePage(this.pageParams)
		}

	}

	// 新建空间
    @action
	createWorkspace = async (values) => {
    	const res = await createWorkspace(values);
		if(res.code === 0 ) {
			// this.findWorkspacePage(this.params);
			this.findWorkspacePage(this.pageParams)
			return res
		}
	}

	//更新空间
	@action
	updateWorkspace = async (values) => {
		values.id = this.workspaceId;
		const res = await updateWorkspace(values);
		if(res.code === 0 ) {
			this.findWorkspacePage(this.pageParams);
		}
	}
	
	//通过id查找空间
	@action
	findWorkspace = async (id) => {
		this.workspaceId = id;
		const param = new FormData();
		param.append('id', id);
		const res = await findWorkspace(param);
		if(res.code === 0){
			this.workspaceName = res.data.workspaceName;
			return res.data;
		}
	}
}

export const WORKSPACE_STORE = 'workspaceStore';

