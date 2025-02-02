import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 接口请求公共store
 * 包含请求体类型 前置 后置
 */
class ApiRequestStore {
    @observable radioValue ="";
    @observable bodyType;
    @observable afterScript;
    @observable preScript;
    @observable apiId;

    /**
     * 通过id查询
     */
    @action
    findApiRequest = async (id) =>{
        this.apiId = id

        const params = new FormData();
        params.append('id', id);

        const res = await Axios.post("/apiRequest/findApiRequest",params);

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
    createApiRequest = async (params) => {
        params.apiId = this.apiId;
        params.id =  this.apiId;

        return await Axios.post("/apiRequest/createApiRequest",params);
    }

    /**
     * 更新
     */
    @action
    updateApiRequest = async (params) => {
        params.apiId =  this.apiId;
        params.id= this.apiId;

        return await Axios.post("/apiRequest/updateApiRequest",params);
    }

    /**
     * 获取请求体中类型
     */
    @action
    getRadioValue = (value) => {
        this.radioValue = value; 
    }

}

let apiRequestStore =new ApiRequestStore();
export default apiRequestStore;
