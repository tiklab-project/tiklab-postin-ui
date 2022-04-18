/**
 * @description：
 * @date: 2021-07-29 13:21
 */
import {observable,action} from "mobx";
import {
    findDataStructurePage,
    findDataStructure,
    createDataStructure,
    deleteDataStructure,
    updateDataStructure
}from'../api/dataStructureApi';


export class DataStructureStore {
    @observable dataStructureList = [];
    @observable dataStructureInfo = {};
    @observable totalRecord ;

    @action
    findDataStructurePage = (param) => {
        const params = {
            ...param,
            orderParams: [{
                name:'name',
                orderType:'asc'
            }],
        }

        const that = this;
        return new Promise(function(resolve, reject){
            findDataStructurePage(params).then(res => {
                if(res.code === 0) {
                    that.dataStructureList = res.data.dataList;
                    that.totalRecord = res.data.totalRecord;
                    resolve(res);
                }
            })
        })
    }

    @action
    findDataStructure = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);

        return new Promise(function(resolve, reject){
            findDataStructure(param).then((res) => {
                if(res.code === 0){
                    that.dataStructureInfo = res.data;
                    resolve(res.data)
                }
            })
        })
    }

    @action
    createDataStructure = (values) => {
        createDataStructure(values).then((res) => {
            if(res.code === 0){
                this.findDataStructurePage()
            }
        })
    }

    @action
    updateDataStructure = (values) => {
        updateDataStructure(values).then((res) => {
            if(res.code === 0){
                this.findDataStructurePage();
            }
        })
    }

    @action
    deleteDataStructure = (id) => {
        const param = new FormData();
        param.append('id', id)
        deleteDataStructure(param).then((res) => {
            this.findDataStructurePage();
        })
    }



}

export const DATASTRUCTURE_STORE = 'dataStructureStore';
