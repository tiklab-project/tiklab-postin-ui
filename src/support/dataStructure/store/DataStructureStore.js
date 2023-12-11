import {observable,action} from "mobx";

import {Axios} from "thoughtware-core-ui";

/**
 * 数据结构
 */
class DataStructureStore {
    @observable dataStructureList = [];
    @observable dataStructureInfo = {};
    @observable totalRecord ;

    /**
     * 查询数据结构列表
     */
    @action
    findDataStructureList = async (params) => {

        let  res = await Axios.post("/dataStructure/findDataStructureList",params)
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


        let res = await Axios.post("/dataStructure/findDataStructure",param)
        if(res.code === 0){
            this.dataStructureInfo = res.data;
            return res.data;
        }
    }

    /**
     * 创建数据结构
     */
    @action
    createDataStructure = async (values) =>  await Axios.post("/dataStructure/createDataStructure",values)

    /**
     * 更新数据结构
     */
    @action
    updateDataStructure = async (values) =>  await Axios.post("/dataStructure/updateDataStructure",values)

    /**
     * 删除数据结构
     */
    @action
    deleteDataStructure = async (id) => {
        const param = new FormData();
        param.append('id', id)
        await Axios.post("/dataStructure/deleteDataStructure",param)
    }



}

let dataStructureStore = new DataStructureStore();
export default dataStructureStore;
