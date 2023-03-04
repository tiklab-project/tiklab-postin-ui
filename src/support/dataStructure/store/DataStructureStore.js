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

/**
 * 数据结构
 */
export class DataStructureStore {
    @observable dataStructureList = [];
    @observable dataStructureInfo = {};
    @observable totalRecord ;

    /**
     * 查询数据结构列表
     */
    @action
    findDataStructureList = async (params) => {

        let  res = await findDataStructureList(params)
        if(res.code === 0) {
            this.dataStructureList = res.data;

            return  res.data
        }
    }

    /**
     * 通过id查询单个数据结构
     */
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

    /**
     * 创建数据结构
     */
    @action
    createDataStructure = async (values) =>  await createDataStructure(values)

    /**
     * 更新数据结构
     */
    @action
    updateDataStructure = async (values) =>  await updateDataStructure(values)

    /**
     * 删除数据结构
     */
    @action
    deleteDataStructure = async (id) => {
        const param = new FormData();
        param.append('id', id)
        await deleteDataStructure(param)
    }



}

export const DATASTRUCTURE_STORE = 'dataStructureStore';
