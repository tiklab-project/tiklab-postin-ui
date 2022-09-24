import { observable,  action } from "mobx";
import {
    findApiRequest,
    updateApiRequest,
    createApiRequest
} from "../api/apiRequestApi"

export class ApiRequestStore {
    @observable radioValue ="";
    @observable bodyType;
    @observable afterScript;
    @observable preScript;
    @observable httpId;

    @action
    findApiRequest = async (id) =>{
        this.httpId = id

        const param = new FormData();
        param.append('id', id);

        const res = await findApiRequest(param);

        if( res.code === 0 ){
            this.afterScript = res.data?.afterScript;
            this.preScript = res.data?.preScript;
            this.bodyType = res.data?.bodyType
            return res.data;
        }
    }

    @action
    createApiRequest = async (values) => {
        values.httpId = this.httpId;
        values.id =  this.httpId;

        return await createApiRequest(values);
    }

    @action
    updateApiRequest = async (values) => {
        values.httpId =  this.httpId;
        values.id= this.httpId;

        return await updateApiRequest(values);
    }

    @action
    getRadioValue = (value) => {
        this.radioValue = value; 
    }

}

export const APIREQUEST_STORE = 'apiRequestStore';
