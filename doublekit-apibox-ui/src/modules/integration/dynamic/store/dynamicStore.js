import {observable, action, toJS} from "mobx";
import {
    findDynamicPage,
    createDynamic,
    findDynamic,
    updateDynamic,
    deleteDynamic,
    findDynamicList
} from '../api/dynamicApi'

export class DynamicStore {

    @observable dynamicList = [];


    //根据查询对象按分页查询接口列表
    @action
    findDynamicPage = async (values) => {
        let params = {
            orderParams:[{name:'name', orderType:'asc'}],
            ...values
        }

        const res = await findDynamicPage(params);
        if(res.code === 0 ) {
            this.dynamicList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return  res;
        }
    }

    @action
    findDynamicList = async (values) => {
        let params = {
            orderParams:[{name:'operationTime', orderType:'desc'}],
            ...values
        }

        const res = await findDynamicList(params);
        if(res.code === 0 ) {
            this.dynamicList = res.data;
            return  res;
        }
    }


}


export const DYNAMIC_STORE = 'dynamicStore';
