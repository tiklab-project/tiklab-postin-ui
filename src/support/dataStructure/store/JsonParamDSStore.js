import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


/**
 * json结构 store
 */
class JsonParamDSStore {

    @observable jsonParamDSList = [];
    @observable jsonParamDSInfo = [];

    @observable schemaData={};

    /**
     * 获取schema值
     */
    @action
    getSchemaData = (data) =>{
        this.schemaData = data;
    }

    /**
     * 获取schema值
     */
    @action
    setSchemaData = (data) =>{
        this.schemaData = data;
    }


    /**
     * 查询json结构列表
     */
    @action
    findJsonParamDSListTree =async (id) => {
        this.dataStructureId = id;

        const params = {
            dataStructureId: id,
            orderParams:[{
                name:'paramName',
                orderType:'asc'
            }],
        }

        let res =await Axios.post("/jsonParamDS/findJsonParamDSListTree",params)
        if(res.code === 0) {
            this.jsonParamDSList = res.data;

            return res.data;
        }


    }

    /**
     * 通过id查询单个json结构
     */
    @action
    findJsonParamDS = async (id) => {
        const param = new FormData();
        param.append('id', id);

        let res = await Axios.post("/jsonParamDS/findJsonParamDS",param)
        if(res.code ===0){
            return res.data
        }
    }

    /**
     * 创建json结构
     */
    @action
    createJsonParamDS = async (values) =>  await Axios.post("/jsonParamDS/createJsonParamDS",values)

    /**
     * 更新json结构
     */
    @action
    updateJsonParamDS = async (values) => await Axios.post("/jsonParamDS/updateJsonParamDS",values)

    /**
     * 删除json结构
     */
    @action
    deleteJsonParamDS = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/jsonParamDS/deleteJsonParamDS",param)
    }

}


let jsonParamDSStore = new JsonParamDSStore()
export default jsonParamDSStore;
