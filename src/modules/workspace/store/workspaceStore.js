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
	findWorkspaceJoinList,
	findWorkspaceTotal,
	findAllWorkspace,
	findWorkspaceHomeTotal,
} from '../api/workspaceApi';
import {findWorkspaceRecentList} from "../api/workspaceRecentApi";
import {findWorkspaceFollowList} from "../api/workspaceFollowApi";

export class WorkspaceStore {
	@observable workspaceList = [];
	@observable workspaceInfo;
	@observable workspaceId ='';
	@observable workspaceName = '';
	@observable	totalRecord = "";
	@observable params;
	@observable pageParams;
	@observable length;
	@observable settingItemSelected;

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
	findWorkspaceList = async (value) => {
		this.params = {
			orderParams:[{name:'workspaceName', orderType:'asc'}],
			...value
		}
		const res = await findWorkspaceList(this.params)
		if(res.code === 0 ) {
			this.workspaceList = res.data;
			return res;
		}
	}


	@action
	findWorkspaceJoinList = async (value) => {
		const res = await findWorkspaceJoinList(value)
		if(res.code === 0 ) {
			this.workspaceList = res.data;
			return res;
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
			let list = res.data;

			let newList = [];
			if(list&&list.length>0){
				list.map(item=>{
					newList.push(item.workspace)
				})
			}

			this.workspaceList = newList

			return res.data;
		}
	}

	@action
	findWorkspaceFollowList = async (value) => {
		this.params = {
			...value,
			orderParams:[{name:'createTime', orderType:'desc'}],
		}
		const res = await findWorkspaceFollowList(this.params)
		if(res.code === 0 ) {
			let list = res.data;

			let newList = [];
			if(list&&list.length>0){
				list.map(item=>{
					newList.push(item.workspace)
				})
			}

			this.workspaceList = newList

			return res.data;
		}
	}




	@action
	findAllWorkspace = async (data) =>{
		const res = await findAllWorkspace(data);

		if(res.code === 0 ){

			return res.data;
		}
	}


	// 删除空间
	@action
	deleteWorkspace = async (id) => {
		const param = new FormData();
		param.append('id', id)

		await deleteWorkspace(param)
	}

	// 新建空间
    @action
	createWorkspace = async (values) => await createWorkspace(values)

	//更新空间
	@action
	updateWorkspace = async (values) => await updateWorkspace(values);


	
	//通过id查找空间
	@action
	findWorkspace = async (id) => {
		this.workspaceId = id;
		const param = new FormData();
		param.append('id', id);

		const res = await findWorkspace(param);
		if(res.code === 0){
			this.workspaceInfo = res.data
			this.workspaceName =res.data.workspaceName;
			return res.data;
		}
	}

	@action
	findWorkspaceTotal = async (id) =>{
		const param = new FormData();
		param.append('id', id);

		const res = await findWorkspaceTotal(param);
		if(res.code === 0){
			return res.data;
		}
	}

	@action
	findWorkspaceHomeTotal = async (userId) =>{
		let param = new FormData();
		param.append("userId",userId)

		let res = await findWorkspaceHomeTotal(param)
		if(res.code===0){
			return res.data
		}
	}

	//空间设置中的导航的选中项
	@action
	settingMenuSelected = (selected)=>{
		this.settingItemSelected = selected;
	}



}

export const WORKSPACE_STORE = 'workspaceStore';

