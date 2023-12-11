import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * 最近访问的空间 store
 */
class WorkspaceRecentStore {
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
		const res = await Axios.post("/workspaceRecent/workspaceRecent",params);
		if(res.code === 0 ) {
			return res.data;
		}
	}

	/**
	 * 查询最近访问的空间列表
	 */
	@action
	findWorkspaceRecentList = async (value) => {
		this.params = {
			...value,
			orderParams:[{name:'updateTime', orderType:'desc'}],
		}
		const res = await Axios.post("/workspaceRecent/findWorkspaceRecentPage",this.params)

		if(res.code === 0 ) {
			this.recentList = res.data.dataList;

			return res.data.dataList;
		}
	}

}

let workspaceRecentStore = new WorkspaceRecentStore();
export default workspaceRecentStore;

