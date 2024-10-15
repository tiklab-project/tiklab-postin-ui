import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 接口响应结果store
 */
class ApiResponseStore {
    //响应体类型
    @observable bodyType;

    //响应结果列表
    @observable apiResponseList;

    /**
     * 通过id查询单个响应结果
     */
    @action
    findApiResponse = async (id) => {
        const params = new FormData();
        params.append('id', id);

        const res = await Axios.post("/apiResponse/findApiResponse",params);
        if( res.code === 0){

            return res.data;
        }
    }

    /**
     * 查询响应结果列表
     */
    @action
    findApiResponseList = async (params) => {
        const res = await Axios.post("/apiResponse/findApiResponseList",params);
        if( res.code === 0){
            this.apiResponseList = res.data;
            return res.data;
        }
    }

    /**
     * 创建响应结果
     */
    @action
    createApiResponse = async (params) => await Axios.post("/apiResponse/createApiResponse",params)

    /**
     * 更新响应结果
     */
    @action
	updateApiResponse = async (params) => await Axios.post("/apiResponse/updateApiResponse",params)

    /**
     * 删除响应结果
     */
    @action
    deleteApiResponse = async (id) => {
        let params = new FormData()
        params.append("id",id)

        await Axios.post("/apiResponse/deleteApiResponse",params);
    }
}

let apiResponseStore = new ApiResponseStore();
export default apiResponseStore;

