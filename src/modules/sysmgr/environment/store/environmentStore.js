import { observable,  action } from "mobx";
import { 
	deleteEnvironment,
	createEnvironment, 
    findEnvironment, 
	updateEnvironment,
	findEnvironmentList
} from '../api/environmentApi';

export class EnvironmentStore {
	@observable environmentList = [];
	@observable envSourceList = [];
	@observable dataLength;
	@observable testEnvUrl;

	@action
	getTestEnvUrl=(url)=>{
		this.testEnvUrl=url
	}

	@action
	setList = (values) => {
		this.environmentList = [...values]
	}

	@action
	addNewList = (list) => {
		this.environmentList = [...list];
	}

	@action
	findEnvironmentList= async ()=>{
		const params = {
			orderParams:[{ name:'name', orderType:'asc'}],
		}

		let newRow = [{id:"environmentInitRow"}]

		const res = await findEnvironmentList(params);
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


	@action
	deleteEnvironment =async (id) => {
		const param = new FormData();
		param.append('id', id);
		const res = await deleteEnvironment(param)

		if(res.code === 0){
			this.findEnvironmentList();
		}

	}

    @action
	createEnvironment = async (values) => {
		const res = await createEnvironment(values)
		if(res.code === 0) {
			return this.findEnvironmentList()
		}

	}

	@action
	updateEnvironment = async (values) => {
		const res = await updateEnvironment(values)
		if(res.code === 0) {
			return this.findEnvironmentList()
		}
	}

	@action
	findEnvironment = (id) => {
		const param = new FormData();
		param.append('id', id);
        return new Promise(function(resolve, reject){
            findEnvironment(param).then(res => {
				if( res.code === 0){
                	resolve(res.data);
				}
            })
        })
	}

}

export const ENVIRONMENT_STORE = 'environmentStore';

