import {observable, action} from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * 接口store
 */
class APIStore {

    /**
     * 根据查询对象按分页查询接口列表
     */
    @action
    findApiPage = async (values) => {
        let params = {
            orderParams:[{name:'createTime', orderType:'asc'}],
            ...values
        }

        const res = await Axios.post("/apx/findApixPage",params);
        if(res.code === 0 ) {
            return  res.data;
        }
    }

    /**
     * 根据接口ID查找接口
     */
    @action
    findApi = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apx/findApix",param);
        if( res.code === 0 ){
            return res.data;
        }
    }

    /**
     * 创建接口
     */
    @action
    createApi = async (values) => await Axios.post("/apx/createApix",values)


    /**
     * 更新接口
     */
    @action
    updateApi = async (values) =>  await Axios.post("/apx/updateApix",values)


    /**
     * 删除接口
     */
    @action
    deleteApi = async (id) => {
        const param = new FormData();
        param.append('id', id);
        return  await Axios.post("/apx/deleteApix",param)
    }


}


let apiStore = new APIStore();
export default apiStore;