import { observable,  action , toJS} from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * 定义
 * http
 * json store
 */
class JsonParamStore {

    @observable jsonSchemaData;

    /**
     * 通过id查询单个json
     */
    @action
    findJsonParam = async (id) => {
        this.jsonParamId = id;
        const params = new FormData();
        params.append('id', id);

        const res = await Axios.post("/jsonParam/findJsonParam",params)
        if( res.code === 0){
            this.jsonSchemaData = res.data;
            return  res.data;
        }
    }

    /**
     * 创建json
     */
    @action
    createJsonParam =async (params) => await Axios.post("/jsonParam/createJsonParam",params)


    /**
     * 更新json
     */
    @action
	updateJsonParam = async (params) =>  await Axios.post("/jsonParam/updateJsonParam",params)

}



let jsonParamStore =  new JsonParamStore();

export default jsonParamStore;
