import { observable,  action } from "mobx";
import {
    findRequestHeaderList,
    createRequestHeader,
    findRequestHeader,
    updateRequestHeader,
    deleteRequestHeader
} from '../api/requestHeaderApi';

export  class RequestHeaderStore {
    @observable requestHeaderList = [];
    @observable requestHeaderInfo;
    @observable requestHeaderDataSource = [];
    @observable httpId = '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.requestHeaderList = [...values]
    }

    @action
    findRequestHeaderList = async (id) => {
        this.httpId = id;
        const params = {
            httpId: id,
            orderParams:[{ name:'headerName', orderType:'asc'}],
        }
        const newRow =[ { id: 'RequestHeaderInitRow'}];

        const res = await findRequestHeaderList(params);
        if( res.code===0 ){
            this.dataLength = res.data.length
            this.requestHeaderDataSource=res.data
            if( res.data.length === 0){
                this.requestHeaderList=newRow;
            }else {
                this.requestHeaderList = [...res.data,...newRow];
            }
            return res.data
        }
    }

    @action
    findRequestHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findRequestHeader(param)
        if( res.code === 0){
            this.requestHeaderInfo = res.data;
            return res.data;
        }
    }

    @action
    createRequestHeader = async (values) => {
        values.http = {id:this.httpId}

        const res = await createRequestHeader(values)
        if( res.code === 0){
            return this.findRequestHeaderList(this.httpId);
        }
    }

    @action
	updateRequestHeader = async (values) => {
        const res = await updateRequestHeader(values)
        if( res.code === 0){
            return this.findRequestHeaderList(this.httpId);
        }
    }

    @action
	deleteRequestHeader = async (id) => {
        const param = new FormData();
        param.append('id', id)

		const res = await deleteRequestHeader(param)
        if(res.code === 0){
            this.findRequestHeaderList(this.httpId);
        }
    }

}

export const REQUESTHEADER_STORE = 'requestHeaderStore';
