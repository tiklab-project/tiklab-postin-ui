import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 定义
 * http
 * 请求体 store
 */
export class RequestBodyStore {
    @observable requestbodyType = '';
    @observable apxMethodId = '';
    @observable requestBodyId = "";
    @observable bodyType;

    /**
     * 通过id查询单个请求体
     */
    @action
    findRequestBody = async (id) => {
        this.apxMethodId = id;
        this.requestBodyId= id;

        const param = new FormData();
        param.append('id', id);

        const res  = await Axios.post("/requestBody/findRequestBody",param);
        if( res.code === 0){
            this.requestbodyType = res.data?.bodyType;
            this.bodyType = res.data?.bodyType;
            return res.data;
        }
    }

    /**
     * 创建请求体
     */
    @action
    createRequestBody = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id = this.requestBodyId;

        await Axios.post("/requestBody/createRequestBody",values);
    }

    /**
     * 更新请求体
     */
    @action
	updateRequestBody = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id= this.requestBodyId;

        await Axios.post("/requestBody/updateRequestBody",values);
    }
    
}

export const REQUESTBODY_STORE = 'requestBodyStore';