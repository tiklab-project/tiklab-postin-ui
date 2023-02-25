import { observable,  action } from "mobx";
import { 
    findRequestCase, 
    createRequestCase,
    updateRequestCase
} from '../api/requestCaseApi';

export class RequestCaseStore {
    @observable bodyTypeCase;
    @observable httpCaseId;
    @observable requestCaseId;
    @observable afterScript;
    @observable preScript;
    @observable mediaType

    @action
    getBodyType = (bodyType) =>{
        this.bodyTypeCase = bodyType;
    }

    @action
    getMediaType = (mediaType) =>{
        this.mediaType = mediaType;
    }

    @action
    findRequestCase = async (id) => {
        this.httpCaseId = id;
        this.requestCaseId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findRequestCase(param)
        if(res.code === 0){
            this.bodyTypeCase = res.data?.bodyType;
            this.afterScript = res.data?.afterScript;
            this.preScript = res.data?.preScript;
            return res.data;
        }
    }

    @action
    createRequestCase =async (values) => {
        values.httpCaseId =  this.httpCaseId;
        values.id =  this.requestCaseId;

        await createRequestCase(values)
    }

    @action
	updateRequestCase = async (values) => {
        values.httpCaseId = this.httpCaseId;
        values.id= this.requestCaseId;

		await updateRequestCase(values)
    }
    
}

export const REQUEST_CASE_STORE = 'requestCaseStore';