import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 接口环境 store
 */
class EnvironmentStore {
	@observable environmentList = [];
	@observable envSourceList = [];
	@observable dataLength;
	@observable testEnvUrl;

	/**
	 * 获取 url
	 */
	@action
	getTestEnvUrl=(url)=>{
		this.testEnvUrl=url
	}

	/**
	 * 设置环境列表
	 */
	@action
	setList = (values) => {
		this.environmentList = [...values]
	}

	/**
	 * 添加接口环境
	 */
	@action
	addNewList = (list) => {
		this.environmentList = [...list];
	}

	/**
	 * 查询接口环境列表
	 */
	@action
	findEnvironmentList= async ()=>{
		const params = {
			orderParams:[{ name:'name', orderType:'asc'}],
		}

		let newRow = [{id:"environmentInitRow"}]

		const res = await Axios.post("/environment/findEnvironmentList",params);
		if(res.code===0){
			this.dataLength = res.data.length
			this.envSourceList = res.data;
			if(res.data.length===0){
				this.environmentList=newRow
			}else {
				this.environmentList=res.data;
			}

			return res.data
		}
	}

	/**
	 * 删除接口环境
	 */
	@action
	deleteEnvironment =async (id) => {
		const param = new FormData();
		param.append('id', id);
		const res = await Axios.post("/environment/deleteEnvironment",param)

		if(res.code === 0){
			this.findEnvironmentList();
		}

	}

	/**
	 * 创建接口环境
	 */
    @action
	createEnvironment = async (values) => {
		const res = await Axios.post("/environment/createEnvironment",values)
		if(res.code === 0) {
			return this.findEnvironmentList()
		}

	}

	/**
	 * 更新接口环境
	 */
	@action
	updateEnvironment = async (values) => {
		const res = await Axios.post("/environment/updateEnvironment",values)
		if(res.code === 0) {
			return this.findEnvironmentList()
		}
	}

	/**
	 * 通过id查询单个接口环境
	 */
	@action
	findEnvironment = async (id) => {
		const param = new FormData();
		param.append('id', id);

		await Axios.post("/environment/findEnvironment",param)

	}

}

let environmentStore = new EnvironmentStore();
export default environmentStore;

