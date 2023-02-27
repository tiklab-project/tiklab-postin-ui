/**
 * @description：
 * @date: 2021-07-29 18:24
 */

import { observable,  action } from "mobx";
import {
    findEnumParamListDS,
    createEnumParamDS,
    findEnumParamDS,
    updateEnumParamDS,
    deleteEnumParamDS,
} from '../api/enumParamApi'

export class EnumParamDSStore {

    @observable enumParamDSList = [];

    @action
    findEnumParamDSList = async (id) => {
        const params = {
            dataStructureId: id,
            orderParams:[{
                name:'paramName',
                orderType:'asc'
            }],
        }

        let res = await findEnumParamListDS(params)
        if(res.code === 0) {
            this.enumParamDSList = res.data;

            return  res.data;
        }
    }

    @action
    findEnumParamDS = async (id) => {
        const param = new FormData();
        param.append('id', id);

        let res = await findEnumParamDS(param)
        if( res.code === 0){
            return  res.data;
        }
    }


    @action
    createEnumParamDS = async (values) => await createEnumParamDS(values)

    @action
    updateEnumParamDS = async (values) => await updateEnumParamDS(values)

    @action
    deleteEnumParamDS = async (id) => {
        const param = new FormData();
        param.append('id', id);

        return await deleteEnumParamDS(param)
    }
}

export const ENUMPARAMDS_STORE = 'enumParamDSStore';
