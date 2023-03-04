import { observable,  action , toJS} from "mobx";
import {
    findJsonParamDSListTree,
    createJsonParamDS,
    findJsonParamDS,
    updateJsonParamDS,
    deleteJsonParamDS
} from '../api/jsonParamDSApi'

/**
 * json结构 store
 */
export class JsonParamDSStore {

    @observable jsonParamDSList = [];
    @observable jsonParamDSInfo = [];

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

        let res =await findJsonParamDSListTree(params)
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

        let res = await findJsonParamDS(param)
        if(res.code ===0){
            return res.data
        }
    }

    /**
     * 创建json结构
     */
    @action
    createJsonParamDS = async (values) =>  await createJsonParamDS(values)

    /**
     * 更新json结构
     */
    @action
    updateJsonParamDS = async (values) => await updateJsonParamDS(values)

    /**
     * 删除json结构
     */
    @action
    deleteJsonParamDS = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteJsonParamDS(param)
    }

}



export const JSONPARAMDS_STORE = 'jsonParamDSStore';
