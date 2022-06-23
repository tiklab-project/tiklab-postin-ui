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
    createRawResponse = (values) => {
        values.http = {id: this.apxMethodId}
        values.id =  this.rawResponseId;

        createRawResponse(values).then((res) => {
            if( res.code === 0){
                this.findRawResponse(this.apxMethodId);
            }
        })
    }

    @action
	updateRawResponse = (values) => {
        values.http = { id: this.apxMethodId}
        values.id =  this.rawResponseId;

		updateRawResponse(values).then((res) => {
            if( res.code === 0){
                this.findRawResponse(this.apxMethodId);
            }
        })
    }
    
}

export const RAWRESPONSE_STORE = 'rawResponseStore';