import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 定义
 * http
 * 请求头 store
 */
class PathParamStore {
    @observable pathParamList = [];
    @observable pathParamInfo;
    @observable pathParamDataSource = [];
    @observable dataLength = '';

    /**
     * 获取新的list
     */
    @action
    setList = (values) => {
        this.pathParamList = [...values]
    }

    /**
     * 查询请求头列表
     */
    @action
    findPathParamList = async (values) => {
        const params = {
           ...values,
            orderParams:[{ name:'name', orderType:'asc'}],
        }
        const newRow =[ { id: 'InitNewRowId'}];

        const res = await Axios.post("/pathParam/findPathParamList",params);
        if( res.code===0 ){
            this.dataLength = res.data.length
            this.pathParamDataSource=res.data
            if( res.data.length === 0){
                this.pathParamList=newRow;
            }else {
                this.pathParamList = [...res.data,...newRow];
            }
            return res.data
        }
    }

    /**
     * 通过id查询单个请求头
     */
    @action
    findPathParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/pathParam/findPathParam",param)
        if( res.code === 0){
            this.pathParamInfo = res.data;
            return res.data;
        }
    }

    /**
     * 创建请求头
     */
    @action
    createPathParam = async (values) => await Axios.post("/pathParam/createPathParam",values)


    /**
     * 更新请求头
     */
    @action
	updatePathParam = async (values) => await Axios.post("/pathParam/updatePathParam",values)


    /**
     * 删除请求头
     */
    @action
	deletePathParam = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/pathParam/deletePathParam",param)
    }

}

let pathParamStore = new PathParamStore()
export default pathParamStore;
