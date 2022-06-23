import { observable,  action } from "mobx";
import {
    findPreScript,
    createPreScript,
    updatePreScript
} from '../api/preParamApi';

export class PreParamStore {
    @observable preScriptInfo;
    @observable apxMethodId = '';

    @action
    findPreScript = async (id) => {
        this.apxMethodId = id;
        const param = new FormData();
        param.append('id', id);

        const res = await findPreScript(param);
        if( res.code === 0){
            this.preScriptInfo = res.data;
            return  res.data;
        }
    }

    @action
    createPreScript = async (values) => {
        values.http = {id: this.apxMethodId};
        values.id =  this.apxMethodId;

        await createPreScript(values);
    }

    @action
	updatePreScript = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id = this.apxMethodId;

        await updatePreScript(values);
    }
}

export const PREPARAM_STORE = 'preParamStore';
