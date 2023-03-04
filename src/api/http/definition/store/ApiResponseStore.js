import { observable,  action } from "mobx";
import { 
    findApiResponse, 
    createApiResponse,
    updateApiResponse,
    findApiResponseList,
    deleteApiResponse
} from '../api/apiResponseApi';

/**
 * 接口响应结果store
 */
export class ApiResponseStore {
    //响应体类型
    @observable bodyType;

    //响应结果列表
    @observable apiResponseList;

    /**
     * 通过id查询单个响应结果
     */
    @action
    findApiResponse = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiResponse(param);
        if( res.code === 0){

            return res.data;
        }
    }

    /**
     * 查询响应结果列表
     */
    @action
    findApiResponseList = async (param) => {
        const res = await findApiResponseList(param);
        if( res.code === 0){
            this.apiResponseList = res.data;
            return res.data;
        }
    }

    /**
     * 创建响应结果
     */
    @action
    createApiResponse = async (values) => await createApiResponse(values)

    /**
     * 更新响应结果
     */
    @action
	updateApiResponse = async (values) => await updateApiResponse(values)

    /**
     * 删除响应结果
     */
    @action
    deleteApiResponse = async (id) => {
        let param = new FormData()
        param.append("id",id)

        await deleteApiResponse(param);
    }
}

export const APIRESPONSE_STORE = 'apiResponseStore';