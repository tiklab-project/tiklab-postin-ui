import { observable,  action } from "mobx";
import {
    findQueryParamList,
    createQueryParam,
    findQueryParam,
    updateQueryParam,
    deleteQueryParam
} from '../api/queryParamApi';

/**
 * 定义
 * http
 * 查询参数 store
 */
export class QueryParamStore {

    @observable queryParamList = [];
    @observable queryParamInfo = [];
    @observable queryParamDataSource = [];
    @observable httpId = '';
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
        this.httpId = id;
        const params = {
            httpId: id,
            orderParams:[{ name:'paramName',  orderType:'asc' }],
        }

        const newRow =[ { id: 'InitNewRowId'}]
        const res = await  findQueryParamList(params)

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
        const that =this;
        const param = new FormData();
        param.append('id', id)

        const res = await findQueryParam(param);
        if( res.code === 0){
            that.queryParamInfo = res.data;
            return res.data
        }
    }

    /**
     * 创建查询参数
     */
    @action
    createQueryParam = async (values) => {
        values.http = {id:this.httpId}

        const res = await createQueryParam(values)
        if( res.code === 0){
           return this.findQueryParamList(this.httpId);
        }
    }

    /**
     * 更新查询参数
     */
    @action
	updateQueryParam = async (values) => {
		const res = await updateQueryParam(values)
        if( res.code === 0){
            return this.findQueryParamList(this.httpId);
        }
    }

    /**
     * 删除查询参数
     */
    @action
	deleteQueryParam = async (id) => {
        const param = new FormData();
        param.append('id', id)
		const res = await deleteQueryParam(param);
        if( res.code === 0){
            this.findQueryParamList(this.httpId);
        }
    }


}

export const QUERYPARAM_STORE = 'queryParamStore';
