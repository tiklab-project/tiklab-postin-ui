import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * 定义
 * http
 * raw store
 */
export class RawParamStore {

    @observable rawParamInfo;
    @observable apxMethodId;
    @observable rawParamId;

    /**
     * 通过id查询单个raw
     */
    @action
    findRawParam = async (id) => {
        this.apxMethodId = id;
        this.rawParamId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/rawParam/findRawParam",param);
        if( res.code ===0){
            this.rawParamInfo = res.data;
            return res.data;
        }
    }

    /**
     * 创建raw
     */
    @action
    createRawParam = async (values) => {
        values.http = {id:this.apxMethodId}
        values.id =  this.rawParamId;

        await Axios.post("/rawParam/createRawParam",values);
    }

    /**
     * 更新raw
     */
    @action
	updateRawParam = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id= this.rawParamId;

		await Axios.post("/rawParam/updateRawParam",values)
    }
    
}

export const RAWPARAM_STORE = 'rawParamStore';