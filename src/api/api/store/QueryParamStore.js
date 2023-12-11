import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * 定义
 * http
 * 查询参数 store
 */
class QueryParamStore {

    @observable queryParamList = [];
    @observable queryParamInfo = [];
    @observable queryParamDataSource = [];
    @observable apiId = '';
    @observable dataLength = '';

    /**
     * 获取新的查询参数
     */
    @action
    setList = (values) => {
        this.queryParamList = [...values]
    }

    /**
     * 查询查询参数列表
     */
    @action
    findQueryParamList = async (id) => {
        this.apiId = id;
        const params = {
            apiId: id,
            orderParams:[{ name:'paramName',  orderType:'asc' }],
        }

        const newRow =[ { id: 'InitNewRowId'}]
        const res = await Axios.post("/queryParam/findQueryParamList",params)

        if( res.code === 0) {
            this.dataLength = res.data.length
            this.queryParamDataSource = res.data;
            if( res.data.length === 0){
                this.queryParamList=newRow;
            }else {
                this.queryParamList = [...res.data,...newRow]
            }
            return res.data;
        }

    }

    /**
     * 通过id查询单个查询参数
     */
    @action
    findQueryParam = async (id) => {

        const param = new FormData();
        param.append('id', id)

        const res = await Axios.post("/queryParam/findQueryParam",param);
        if( res.code === 0){
            this.queryParamInfo = res.data;
            return res.data
        }
    }

    /**
     * 创建查询参数
     */
    @action
    createQueryParam = async (values) => {
        values.apiId = this.apiId

        const res = await Axios.post("/queryParam/createQueryParam",values)
        if( res.code === 0){
           return this.findQueryParamList(this.apiId);
        }
    }

    /**
     * 更新查询参数
     */
    @action
	updateQueryParam = async (values) => {
		const res = await Axios.post("/queryParam/updateQueryParam",values)
        if( res.code === 0){
            return this.findQueryParamList(this.apiId);
        }
    }

    /**
     * 删除查询参数
     */
    @action
	deleteQueryParam = async (id) => {
        const param = new FormData();
        param.append('id', id)
		const res = await Axios.post("/queryParam/deleteQueryParam",param);
        if( res.code === 0){
            this.findQueryParamList(this.apiId);
        }
    }


}

let queryParamStore = new QueryParamStore()
export default queryParamStore;
