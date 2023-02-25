
import { observable,  action } from "mobx";
import {
    findAfterScript,
    createAfterScript,
    updateAfterScript
} from '../api/afterParamApi';

export class AfterParamStore {

    @observable afterScriptInfo;
    @observable apxMethodId = '';

    @action
    findAfterScript = async (id) => {
        this.apxMethodId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findAfterScript(param);
        if( res.code === 0 ){
            this.afterScriptInfo = res.data;
            return res.data;
        }
    }

    @action
    createAfterScript = async (values) => {
        values.http = {id: this.apxMethodId};
        values.id =  this.apxMethodId;

        return await createAfterScript(values);
    }

    @action
	updateAfterScript = async (values) => {
        values.http = {id: this.apxMethodId};
        values.id= this.apxMethodId;

		return await updateAfterScript(values);
    }
}

export const AFTERPARAM_STORE = 'afterParamStore';
