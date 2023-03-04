import { observable,  action } from "mobx";
import {
    findFormUrlencodedList,
    createFormUrlencoded,
    findFormUrlencoded,
    updateFormUrlencoded,
    deleteFormUrlencoded
} from '../api/formUrlencodedApi'

/**
 * 定义
 * http
 * formUrl store
 */
export class FormUrlencodedStore {

    @observable formUrlencodedList = [];
    @observable formUrlencodedInfo;
    @observable formUrlencodedDataSource = [];
    @observable apxMethodId;
    @observable dataLength;

    @action
    setList = (values) => {
        this.formUrlencodedList = [...values]
    }

    /**
     * 查询formUrl列表
     */
    @action
    findFormUrlencodedList = async (id) => {
        this.apxMethodId = id;
        const params = {
            httpId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const newRow =[ { id: 'InitNewRowId'}];
        const res = await findFormUrlencodedList(params);
        if(res.code === 0) {
            this.dataLength = res.data.length
            this.formUrlencodedDataSource = res.data;
            if( res.data.length === 0 ){
                this.formUrlencodedList= newRow;
            }else {
                this.formUrlencodedList = [...res.data,...newRow];
            }
            return  res.data;
        }  
    }

    /**
     * 通过id查询单个formUrl
     */
    @action
    findFormUrlencoded = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFormUrlencoded(param);
        if( res.code === 0){
            this.formUrlencodedInfo = res.data;
           return res.data;
        }
    }

    /**
     * 创建formUrl
     */
    @action
    createFormUrlencoded = async (values) => {
        values.http = {id: this.apxMethodId}

        const res = await createFormUrlencoded(values)
        if( res.code === 0){
            return this.findFormUrlencodedList(this.apxMethodId);
        }
    }

    /**
     * 更新formUrl
     */
    @action
    updateFormUrlencoded = async (values) => {
        const res = await updateFormUrlencoded(values)
        if( res.code === 0){
            return this.findFormUrlencodedList(this.apxMethodId);
        }
    }

    /**
     * 删除formUrl
     */
    @action
    deleteFormUrlencoded = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteFormUrlencoded(param)
        if( res.code === 0){
            this.findFormUrlencodedList(this.apxMethodId);
        }
    }

}

export const FORM_URLENCODED_STORE = 'formUrlencodedStore';
