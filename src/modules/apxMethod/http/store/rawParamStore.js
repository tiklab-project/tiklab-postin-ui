import { observable,  action } from "mobx";
import { 
    findRawParam, 
    createRawParam,
    updateRawParam
} from '../api/rawParamApi';

export class RawParamStore {

    @observable rawParamInfo;
    @observable apxMethodId;
    @observable rawParamId;

    @action
    findRawParam = async (id) => {
        this.apxMethodId = id;
        this.rawParamId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findRawParam(param);
        if( res.code ===0){
            this.rawParamInfo = res.data;
            return res.data;
        }
    }

    @action
    createRawParam = async (values) => {
        values.http = {id:this.apxMethodId}
        values.id =  this.rawParamId;

        await createRawParam(values);
    }

    @action
	updateRawParam = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id= this.rawParamId;

		await updateRawParam(values)
    }
    
}

export const RAWPARAM_STORE = 'rawParamStore';