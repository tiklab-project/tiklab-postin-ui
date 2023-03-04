import { observable,  action } from "mobx";
import { 
	deleteWorkspaceFollow,
	createWorkspaceFollow,
	updateWorkspaceFollow,
	findWorkspaceFollowList,
	findWorkspaceFollowPage
} from '../api/workspaceFollowApi';

/**
 * 空间关注 store
 */
export class WorkspaceFollowStore {
	@observable followList = [];
	@observable totalRecord;

	/**
	 * 获取带分页的空间关注列表
	 */
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

	/**
	 * 获取空间关注列表
	 */
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

	/**
	 * 删除空间关注
	 */
	@action
	deleteWorkspaceFollow = async (id) => {
		const param = new FormData();
		param.append('id', id)
		const res = await deleteWorkspaceFollow(param)
		if(res.code === 0){
			return res.data
		}

	}

	/**
	 * 创建空间关注
	 */
	@action
	createWorkspaceFollow = async (values) => await createWorkspaceFollow(values);

	/**
	 * 更新空间关注
	 */
	@action
	updateWorkspaceFollow = async (values) => await updateWorkspaceFollow(values);

}

export const WORKSPACE_FOLLOW_STORE = 'workspaceFollowStore';

