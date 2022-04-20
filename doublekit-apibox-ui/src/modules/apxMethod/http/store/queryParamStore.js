import { observable,  action } from "mobx";
import {
    findQueryParamList,
    createQueryParam,
    findQueryParam,
    updateQueryParam,
    deleteQueryParam
} from '../api/queryParamApi';

export class QueryParamStore {

    @observable queryParamList = [];
    @observable queryParamInfo = [];
    @observable queryParamDataSource = [];
    @observable httpId = '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.queryParamList = [...values]
    }

    @action
    findQueryParamList = async (id) => {
        this.httpId = id;
        const params = {
            httpId: id,
            orderParams:[{ name:'paramName',  orderType:'asc' }],
        }

        const newRow =[ { id: 'QueryParamInitRow'}]
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


    @action
    createQueryParam = async (values) => {
        values.http = {id:this.httpId}

        const res = await createQueryParam(values)
        if( res.code === 0){
           return this.findQueryParamList(this.httpId);
        }
    }

    @action
	updateQueryParam = async (values) => {
		const res = await updateQueryParam(values)
        if( res.code === 0){
            return this.findQueryParamList(this.httpId);
        }
    }

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
