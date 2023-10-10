import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 定义
 * http
 * formdata store
 */
export class FormParamStore {

    @observable formParamList = [];
    @observable formParamInfo = [];
    @observable formParamDataSource = [];
    @observable apiId = '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.formParamList = [...values]
    }

    /**
     * 查询form列表
     */
    @action
    findFormParamList = async (id) => {
        this.apiId = id;
        const params = {
            httpId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const newRow =[ { id: 'InitNewRowId'}];
        const res = await Axios.post("/formParam/findFormParamList",params);
        if(res.code === 0) {
            this.dataLength = res.data.length
            this.formParamDataSource = res.data;
            if( res.data.length === 0 ){
                this.formParamList= newRow;
            }else {
                this.formParamList = [...res.data,...newRow];
            }

            return res.data;
        }
    }

    /**
     * 通过id查询单个formdata
     */
    @action
    findFormParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/formParam/findFormParam",param)
        if( res.code === 0){
            this.formParamInfo = res.data;
            return  res.data;
        }
    }

    /**
     * 创建formdata
     */
    @action
    createFormParam = async (values) => {
        values.http = {id: this.apiId}

        const res = await Axios.post("/formParam/createFormParam",values);
        if( res.code === 0){
            return  this.findFormParamList(this.apiId);
        }
    }

    /**
     * 更新formdata
     */
    @action
	updateFormParam = async (values) => {
		const res = await Axios.post("/formParam/updateFormParam",values)
        if( res.code === 0){
            return this.findFormParamList(this.apiId);
        }
    }

    /**
     * 删除formdata
     */
    @action
	deleteFormParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

		const res = await Axios.post("/formParam/deleteFormParam",param)
        if( res.code === 0){
            this.findFormParamList(this.apiId);
        }
    }

}

let formParamStore = new FormParamStore()
export default formParamStore;
