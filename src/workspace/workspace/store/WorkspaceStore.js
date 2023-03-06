import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * @Description: 空间store
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-24 09:53:09
 */
export class WorkspaceStore {
	@observable workspaceList = [];
	@observable workspaceInfo;
	@observable workspaceIdList=[];
	@observable workspaceId ='';
	@observable workspaceName = '';
	@observable workspaceIcon
	@observable	totalRecord = "";
	@observable params;
	@observable pageParams;
	@observable length;
	@observable settingItemSelected;

	/**
	 * 获取带分页的空间列表
	 */
	@action
	findWorkspacePage = async (value) => {
		let params = {
			orderParams:[{name:'workspaceName', orderType:'desc'}],
			...value
		}
		const res = await Axios.post("/workspace/findWorkspacePage",params)
		if(res.code === 0 ) {
			this.workspaceList = res.data.dataList;
			this.totalRecord = res.data.totalRecord;
			return res;
		}
	}

	/**
	 * 获取空间列表
	 */
	@action
	findWorkspaceList = async (value) => {
		let params = {
			orderParams:[{name:'workspaceName', orderType:'desc'}],
			...value
		}
		const res = await Axios.post("/workspace/findWorkspaceList",params)
		if(res.code === 0 ) {
			this.workspaceList = res.data;
			return  res.data;
		}
	}


	/**
	 * 查询我参数的空间列表
	 */
	@action
	findWorkspaceJoinList = async (params) => {
		const res = await Axios.post("/workspace/findWorkspaceJoinList",params)
		if(res.code === 0 ) {
			this.workspaceList = res.data;

			let idList = []
			 res.data.map(item=>{
				 idList.push( item.id)
			})
			this.workspaceIdList = idList;

			return  res.data;
		}
	}


	/**
	 * 删除空间
	 */
	@action
	deleteWorkspace = async (id) => {
		const param = new FormData();
		param.append('id', id)

		await Axios.post("/workspace/deleteWorkspace",param)
	}

	/**
	 * 创建空间
	 */
    @action
	createWorkspace = async (values) => await Axios.post("/workspace/createWorkspace",values)

	/**
	 * 更新空间
	 */
	@action
	updateWorkspace = async (values) => await Axios.post("/workspace/updateWorkspace",values);

	/**
	 * 通过id查询单个空间
	 */
	@action
	findWorkspace = async (id) => {
		const param = new FormData();
		param.append('id', id);

		const res = await Axios.post("/workspace/findWorkspace",param);
		if(res.code === 0){
			this.workspaceInfo = res.data
			this.workspaceName =res.data.workspaceName;
			this.workspaceIcon = res.data.iconUrl
			return res.data;
		}
	}

	/**
	 * 查询空间概要
	 */
	@action
	findWorkspaceTotal = async (id) =>{
		const param = new FormData();
		param.append('id', id);

		const res = await Axios.post("/workspace/findWorkspaceTotal",param);
		if(res.code === 0){
			return res.data;
		}
	}

	/**
	 * 空间设置中的导航的选中项
	 */
	@action
	settingMenuSelected = (selected)=>{
		this.settingItemSelected = selected;
	}



}

export const WORKSPACE_STORE = 'workspaceStore';

