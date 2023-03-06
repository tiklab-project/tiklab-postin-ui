import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * 定义
 * http
 * 前置 store
 */
export class PreParamStore {
    @observable preScriptInfo;
    @observable apxMethodId = '';

    /**
     * 通过id查询单个前置
     */
    @action
    findPreScript = async (id) => {
        this.apxMethodId = id;
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/preScript/findPreScript",param);
        if( res.code === 0){
            this.preScriptInfo = res.data;
            return  res.data;
        }
    }

    /**
     * 创建前置
     */
    @action
    createPreScript = async (values) => {
        values.http = {id: this.apxMethodId};
        values.id =  this.apxMethodId;

        return await Axios.post("/preScript/createPreScript",values);
    }

    /**
     * 更新前置
     */
    @action
	updatePreScript = async (values) => {
        values.http = {id: this.apxMethodId}
        values.id = this.apxMethodId;

        return await Axios.post("/preScript/updatePreScript",values);
    }
}

export const PREPARAM_STORE = 'preParamStore';
