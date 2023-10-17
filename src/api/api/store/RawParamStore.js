import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * 定义
 * http
 * raw store
 */
class RawParamStore {

    @observable rawParamInfo;
    @observable apiId;
    @observable rawParamId;

    /**
     * 通过id查询单个raw
     */
    @action
    findRawParam = async (id) => {
        this.apiId = id;
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
        values.apiId = this.apiId
        values.id =  this.rawParamId;

        await Axios.post("/rawParam/createRawParam",values);
    }

    /**
     * 更新raw
     */
    @action
	updateRawParam = async (values) => {
        values.apiId = this.apiId
        values.id= this.rawParamId;

		await Axios.post("/rawParam/updateRawParam",values)
    }
    
}

let rawParamStore = new RawParamStore()
export default rawParamStore;