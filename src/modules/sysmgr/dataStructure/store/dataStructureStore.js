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
    updateDataStructure,
    findDataStructureList
} from '../api/dataStructureApi';


export class DataStructureStore {
    @observable dataStructureList = [];
    @observable dataStructureInfo = {};
    @observable totalRecord ;

    @action
    findDataStructureList = async (params) => {

        let  res = await findDataStructureList(params)
        if(res.code === 0) {
            this.dataStructureList = res.data;

            return  res.data
        }
    }

    @action
    findDataStructure = async (id) => {
        const param = new FormData();
        param.append('id', id);


        let res = await findDataStructure(param)
        if(res.code === 0){
            this.dataStructureInfo = res.data;
            return res.data;
        }
    }

    @action
    createDataStructure = async (values) =>  await createDataStructure(values)

    @action
    updateDataStructure = async (values) =>  await updateDataStructure(values)

    @action
    deleteDataStructure = async (id) => {
        const param = new FormData();
        param.append('id', id)
        await deleteDataStructure(param)
    }



}

export const DATASTRUCTURE_STORE = 'dataStructureStore';
