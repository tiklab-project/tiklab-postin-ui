import { observable,  action } from "mobx";
import { 
	deleteEnvironment,
	createEnvironment, 
    findEnvironment, 
	updateEnvironment, 
	findEnvironmentPage 
} from '../api/environmentApi';

export class EnvironmentStore {
	@observable environmentList = [];
	@observable environmentId ='';
	@observable environmentName = '';
	@observable	totalRecord = "";
	@observable pageParam ={
		current:1,
		pageSize:5
	};

	@action
	findEnvironmentPage = (name) => {
		const that = this;
		const params = {
			name: name,
			orderParams: [{
				name:'name',
				orderType:'asc'
			}],
			pageParam: {
				pageSize: this.pageParam.pageSize,
				currentPage: this.pageParam.current
			}
		}
		return new Promise(function(resolve, reject){
			findEnvironmentPage(params).then(res => {
				if(res.code === 0) {
					that.environmentList = res.data.dataList;
					that.totalRecord = res.data.totalRecord;
					resolve(res);
				}
			}).catch(error => {
				reject(error)
			})
		})
	}
	
	@action
	deleteEnvironment = (id) => {
		const param = new FormData();
		param.append('id', id);
		deleteEnvironment(param).then(() => {
			this.findEnvironmentPage().then((res)=>{
				if( res.code === 0) {
					if(res.data.length === 0){
						this.pageParam.current--
					}
				}
			})
        }).catch(error => {
            console.log(error)
        })
	}

    @action
	createEnvironment = (values) => {
		createEnvironment(values).then(res => {
			if(res.code === 0) {
				this.findEnvironmentPage()
			}
        }).catch(error => {
            console.log(error)
        })
	}

	@action
	updateEnvironment = (values) => {
		values.id = this.environmentId;
		updateEnvironment(values).then((res) => {
			if(res.code === 0) {
				this.findEnvironmentPage()
			}
        }).catch(error => {
            console.log(error)
        })
	}
	
	@action
	findEnvironment = (id) => {
		this.environmentId = id;
		const param = new FormData();
		param.append('id', id);
        return new Promise(function(resolve, reject){
            findEnvironment(param).then(res => {
				if( res.code === 0){
                	resolve(res.data);
				}
            }).catch(error => {
                reject(error)
            })
        })	
	}

	@action
	setPagination = (pagination) => {
		this.pageParam = Object.assign( this.pageParam, pagination )
	}



}

export const ENVIRONMENT_STORE = 'environmentStore';

