import { observable,  action } from "mobx";
import { 
    findResponseResult, 
    createResponseResult,
    updateResponseResult
} from '../api/responseResultApi';

export class ResponseResultStore {
    @observable responseResultType = '';
    @observable apxMethodId = '';
    @observable responseResultId = '';

    @action
    findResponseResult = async (id) => {
        this.apxMethodId = id;
        this.responseResultId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findResponseResult(param);
        if( res.code === 0){
            return res.data;
        }
    }

    @action
    createResponseResult = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id =  this.responseResultId;

        await createResponseResult(values);
    }

    @action
	updateResponseResult = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id= this.responseResultId;

		await updateResponseResult(values)
    }
    
}

export const RESPONSERESULT_STORE = 'responseResultStore';