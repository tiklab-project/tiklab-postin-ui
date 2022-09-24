import { observable,  action } from "mobx";
import { 
    findApiResponse, 
    createApiResponse,
    updateApiResponse
} from '../api/apiResponseApi';

export class ApiResponseStore {
    @observable bodyType = '';
    @observable apxMethodId = '';
    @observable apiResponseId = '';

    @action
    findApiResponse = async (id) => {
        this.apxMethodId = id;
        this.apiResponseId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findApiResponse(param);
        if( res.code === 0){
            this.bodyType = res.data.bodyType;
            return res.data;
        }
    }

    @action
    createApiResponse = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id =  this.apiResponseId;

        await createApiResponse(values);
    }

    @action
	updateApiResponse = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id= this.apiResponseId;

		await updateApiResponse(values)
    }
    
}

export const APIRESPONSE_STORE = 'apiResponseStore';