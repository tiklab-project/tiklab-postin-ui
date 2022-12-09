import { observable,  action } from "mobx";
import { 
    findApiResponse, 
    createApiResponse,
    updateApiResponse,
    findApiResponseList,
    deleteApiResponse
} from '../api/apiResponseApi';

export class ApiResponseStore {
    @observable bodyType;
    @observable apiResponseList;

    @action
    findApiResponse = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiResponse(param);
        if( res.code === 0){

            return res.data;
        }
    }

    @action
    findApiResponseList = async (param) => {
        const res = await findApiResponseList(param);
        if( res.code === 0){
            this.apiResponseList = res.data;
            return res.data;
        }
    }


    @action
    createApiResponse = async (values) => await createApiResponse(values)

    @action
	updateApiResponse = async (values) => await updateApiResponse(values)


    @action
    deleteApiResponse = async (id) => {
        let param = new FormData()
        param.append("id",id)

        await deleteApiResponse(param);
    }
}

export const APIRESPONSE_STORE = 'apiResponseStore';