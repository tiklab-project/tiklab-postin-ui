
import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * 接口文档 store
 */
class ShareStore {
    @observable shareList = [];
    @observable totalRecord ;

    @action
    findSharePage = async (params) =>{
        let  res = await Axios.post("/share/findSharePage",params)
        if(res.code === 0) {
            return  res.data
        }
    }


    /**
     * 查询左侧树形列表的接口目录树
     */
    @action
    findShareTree = async (params) => {

        let  res = await Axios.post("/share/findShareTree",params)
        if(res.code === 0) {
            this.shareList = res.data;

            return  res.data
        }
    }

    /**
     * 通过id查询单个接口文档
     */
    @action
    findShare = async (id) => {
        const param = new FormData();
        param.append('id', id);

        let res = await Axios.post("/share/findShare",param)
        if(res.code === 0){
            return res;
        }
    }

    /**
     * 创建接口文档
     */
    @action
    createShare = async (values) =>  await Axios.post("/share/createShare",values)

    /**
     * 更新接口文档
     */
    @action
    updateShare = async (values) =>  await Axios.post("/share/updateShare",values)

    /**
     * 删除接口文档
     */
    @action
    deleteShare = async (id) => {
        const param = new FormData();
        param.append('id', id)
        await Axios.post("/share/deleteShare",param)
    }



}

let shareStore = new ShareStore();
export default shareStore;