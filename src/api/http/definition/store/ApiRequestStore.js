import { observable,  action } from "mobx";
import {
    findApiRequest,
    updateApiRequest,
    createApiRequest
} from "../api/apiRequestApi"

/**
 * 接口请求公共store
 * 包含请求体类型 前置 后置
 */
export class ApiRequestStore {
    @observable radioValue ="";
    @observable bodyType;
    @observable afterScript;
    @observable preScript;
    @observable httpId;

    /**
     * 通过id查询
     */
    @action
    findApiRequest = async (id) =>{
        this.httpId = id

        const param = new FormData();
        param.append('id', id);

        const res = await findApiRequest(param);

        if( res.code === 0 ){
            this.afterScript = res.data?.afterScript;
            this.preScript = res.data?.preScript;
            this.bodyType = res.data?.bodyType
            return res.data;
        }
    }

    /**
     * 创建
     */
    @action
    createApiRequest = async (values) => {
        values.httpId = this.httpId;
        values.id =  this.httpId;

        return await createApiRequest(values);
    }

    /**
     * 更新
     */
    @action
    updateApiRequest = async (values) => {
        values.httpId =  this.httpId;
        values.id= this.httpId;

        return await updateApiRequest(values);
    }

    /**
     * 获取请求体中类型
     */
    @action
    getRadioValue = (value) => {
        this.radioValue = value; 
    }

}

export const APIREQUEST_STORE = 'apiRequestStore';
