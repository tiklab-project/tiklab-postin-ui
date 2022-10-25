/*
 * @Description: 空间store
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-24 09:53:09
 */

import { observable,  action } from "mobx";
import { 
	deleteWorkspaceFollow,
	createWorkspaceFollow,
	updateWorkspaceFollow,
	findWorkspaceFollowList,
	findWorkspaceFollowPage
} from '../api/workspaceFollowApi';

export class WorkspaceFollowStore {
	@observable followList = [];
	@observable totalRecord;
	
	@action
	findWorkspaceFollowPage = async (value) => {
		this.pageParams = {
			orderParams:[{name:'createTime', orderType:'desc'}],
			...value
		}
		const res = await findWorkspaceFollowPage(this.pageParams)
		if(res.code === 0 ) {
			this.followList = res.data.dataList;
			this.totalRecord = res.data.totalRecord;
			return res;
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
			this.followList = res.data;

			return res;
		}
	}


	// 删除
	@action
	deleteWorkspaceFollow = async (id) => {
		const param = new FormData();
		param.append('id', id)
		const res = await deleteWorkspaceFollow(param)
		if(res.code === 0){
			return res.data
		}

	}

	// 新建
	@action
	createWorkspaceFollow = async (values) => await createWorkspaceFollow(values);

	//更新
	@action
	updateWorkspaceFollow = async (values) => await updateWorkspaceFollow(values);

}

export const WORKSPACE_FOLLOW_STORE = 'workspaceFollowStore';

