import { Axios } from "tiklab-core-ui";
import { observable,  action } from "mobx";

/**
 * 后置脚本store
 */
export class AfterParamStore {

    @observable afterScriptInfo;
    @observable apxMethodId = '';

    /**
     * 通过id查询单个后置脚本
     */
    @action
    findAfterScript = async (id) => {
        this.apxMethodId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/afterScript/findAfterScript",param);
        if( res.code === 0 ){
            this.afterScriptInfo = res.data;
            return res.data;
        }
    }

    /**
     * 创建后置脚本
     */
    @action
    createAfterScript = async (values) => {
        values.http = {id: this.apxMethodId};
        values.id =  this.apxMethodId;

        return await  Axios.post("/afterScript/createAfterScript",values);
    }

    /**
     * 更新后置脚本
     */
    @action
	updateAfterScript = async (values) => {
        values.http = {id: this.apxMethodId};
        values.id= this.apxMethodId;

		return await Axios.post("/afterScript/updateAfterScript",values);
    }
}

export const AFTERPARAM_STORE = 'afterParamStore';
