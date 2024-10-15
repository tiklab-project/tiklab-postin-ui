import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 定义
 * http
 * 响应中raw store
 */
class RawResponseStore {

    @observable rawResponseInfo;
    @observable apiId = '';
    @observable rawResponseId = '';

    /**
     * 通过id查询单个响应中raw
     */
    @action
    findRawResponse = async (id) => {
        this.apiId = id;
        this.rawResponseId = id;

        const param = new FormData();
        param.append('id', id)

        const res = await Axios.post("/rawParam/findRawParam",param);
        if( res.code === 0){
            return this.rawResponseInfo = res.data
        }
    }

    /**
     * 创建响应中raw
     */
    @action
    createRawResponse = async (values) => {
        values.http = {id: this.apiId}
        values.id =  this.rawResponseId;

        return await Axios.post("/rawParam/createRawParam",values)
    }

    /**
     * 更新响应中raw
     */
    @action
	updateRawResponse =async (values) => {
        values.http = { id: this.apiId}
        values.id =  this.rawResponseId;

		return await Axios.post("/rawParam/updateRawParam",values)
    }
    
}

let rawResponseStore = new RawResponseStore()

export default rawResponseStore;