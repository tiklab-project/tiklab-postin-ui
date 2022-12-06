import { observable,  action } from "mobx";
import { 
    findApiResponse, 
    createApiResponse,
    updateApiResponse
} from '../api/apiResponseApi';

export class ApiResponseStore {
    @observable bodyType;

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
    createApiResponse = async (values) => await createApiResponse(values)

    @action
	updateApiResponse = async (values) => await updateApiResponse(values)
    
}

export const APIRESPONSE_STORE = 'apiResponseStore';