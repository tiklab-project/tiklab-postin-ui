import { observable,  action } from "mobx";
import { 
    findRawResponse, 
    createRawResponse,
    updateRawResponse
} from '../api/rawResponseApi';

export class RawResponseStore {

    @observable rawResponseInfo;
    @observable apxMethodId = '';
    @observable rawResponseId = '';

    @action
    findRawResponse = async (id) => {
        this.apxMethodId = id;
        this.rawResponseId = id;

        const param = new FormData();
        param.append('id', id)

        const res = await findRawResponse(param);
        if( res.code === 0){
            return this.rawResponseInfo = res.data
        }
    }

    @action
    createRawResponse = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id =  this.rawResponseId;

        return await createRawResponse(values)
    }

    @action
	updateRawResponse =async (values) => {
        values.http = { id: this.apxMethodId}
        values.id =  this.rawResponseId;

		return await updateRawResponse(values)
    }
    
}

export const RAWRESPONSE_STORE = 'rawResponseStore';