import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 最近访问的接口 store
 */
class ApiRecentStore {
	@observable recentList = [];


	/**
	 * 设置最近访问的接口
	 */
	@action
	apiRecent = async (values) => {
		const res = await Axios.post("/apiRecent/apiRecent",values);
		if(res.code === 0 ) {
			return res.data;
		}
	}

	/**
	 * 查询最近访问的接口列表
	 */
	@action
	findApiRecentList = async (value) => {
		this.params = {
			...value,
			orderParams:[{name:'updateTime', orderType:'desc'}],
		}
		const res = await Axios.post("/apiRecent/findApiRecentList",this.params)

		if(res.code === 0 ) {
			this.recentList = res.data;

			return res.data;
		}
	}
}

let apiRecentStore = new ApiRecentStore();
export default apiRecentStore;

