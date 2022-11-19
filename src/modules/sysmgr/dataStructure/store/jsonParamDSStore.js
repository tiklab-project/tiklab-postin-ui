/**
 * @description：
 * @date: 2021-07-30 09:13
 */
import { observable,  action , toJS} from "mobx";
import {
    findJsonParamDSListTree,
    createJsonParamDS,
    findJsonParamDS,
    updateJsonParamDS,
    deleteJsonParamDS
} from '../api/jsonParamDSApi'

export class JsonParamDSStore {

    @observable jsonParamDSList = [];
    @observable jsonParamDSInfo = [];

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

    @action
    findJsonParamDS = async (id) => {
        const param = new FormData();
        param.append('id', id);

        let res = await findJsonParamDS(param)
        if(res.code ===0){
            return res.data
        }
    }


    @action
    createJsonParamDS = async (values) =>  await createJsonParamDS(values)

    @action
    updateJsonParamDS = async (values) => await updateJsonParamDS(values)

    @action
    deleteJsonParamDS = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteJsonParamDS(param)
    }

}



export const JSONPARAMDS_STORE = 'jsonParamDSStore';
