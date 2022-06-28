import { observable,  action } from "mobx";
import { 
    findRequestBody, 
    createRequestBody,
    updateRequestBody
} from '../api/requestBodyApi';

export class RequestBodyStore {
    @observable requestbodyType = '';
    @observable apxMethodId = '';
    @observable requestBodyId = "";
    @observable bodyType;

    @action
    findRequestBody = async (id) => {
        this.apxMethodId = id;
        this.requestBodyId= id;

        const param = new FormData();
        param.append('id', id);

        const res  = await findRequestBody(param);
        if( res.code === 0){
            this.requestbodyType = res.data?.bodyType;
            this.bodyType = res.data?.bodyType;
            return res.data;
        }
    }

    @action
    createRequestBody = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id = this.requestBodyId;

        await createRequestBody(values);
    }

    @action
	updateRequestBody = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id= this.requestBodyId;

        await updateRequestBody(values);
    }
    
}

export const REQUESTBODY_STORE = 'requestBodyStore';