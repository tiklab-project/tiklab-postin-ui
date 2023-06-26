import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 空间关注 store
 */
class WorkspaceFollowStore {
	@observable followList = [];
	@observable totalRecord;


	/**
	 * 查询关注的空间列表
	 */
	@action
	findWorkspaceFollowList = async (value) => {
		let params = {
			...value,
			orderParams:[{name:'createTime', orderType:'desc'}],
		}
		const res = await Axios.post("/workspaceFollow/findWorkspaceFollowList",params)
		if(res.code === 0 ) {
			let list = res.data;

			let newList = [];
			if(list&&list.length>0){
				list.map(item=>{
					newList.push(item.workspace)
				})
			}

			this.workspaceList = newList

			return newList;
		}
	}


	/**
	 * 删除空间关注
	 */
	@action
	deleteWorkspaceFollow = async (id) => {
		const param = new FormData();
		param.append('id', id)
		const res = await Axios.post("/workspaceFollow/deleteWorkspaceFollow",param)
		if(res.code === 0){
			return res.data
		}

	}

	/**
	 * 创建空间关注
	 */
	@action
	createWorkspaceFollow = async (values) => await Axios.post("/workspaceFollow/createWorkspaceFollow",values);

	/**
	 * 更新空间关注
	 */
	@action
	updateWorkspaceFollow = async (values) => await Axios.post("/workspaceFollow/updateWorkspaceFollow",values);

}

let workspaceFollowStore = new WorkspaceFollowStore();
export default workspaceFollowStore;

