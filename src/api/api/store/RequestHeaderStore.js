import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 定义
 * http
 * 请求头 store
 */
class RequestHeaderStore {
    @observable requestHeaderList = [];
    @observable requestHeaderInfo;
    @observable requestHeaderDataSource = [];
    @observable dataLength = '';

    /**
     * 获取新的list
     */
    @action
    setList = (values) => {
        this.requestHeaderList = [...values]
    }

    /**
     * 查询请求头列表
     */
    @action
    findRequestHeaderList = async (values) => {
        const params = {
           ...values,
            orderParams:[{ name:'headerName', orderType:'asc'}],
        }
        const newRow =[ { id: 'InitNewRowId'}];

        const res = await Axios.post("/requestHeader/findRequestHeaderList",params);
        if( res.code===0 ){
            this.dataLength = res.data.length
            this.requestHeaderDataSource=res.data
            if( res.data.length === 0){
                this.requestHeaderList=newRow;
            }else {
                this.requestHeaderList = [...res.data,...newRow];
            }
            return res.data
        }
    }

    /**
     * 通过id查询单个请求头
     */
    @action
    findRequestHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/requestHeader/findRequestHeader",param)
        if( res.code === 0){
            this.requestHeaderInfo = res.data;
            return res.data;
        }
    }

    /**
     * 创建请求头
     */
    @action
    createRequestHeader = async (values) => await Axios.post("/requestHeader/createRequestHeader",values)


    /**
     * 更新请求头
     */
    @action
	updateRequestHeader = async (values) => await Axios.post("/requestHeader/updateRequestHeader",values)


    /**
     * 删除请求头
     */
    @action
	deleteRequestHeader = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/requestHeader/deleteRequestHeader",param)
    }

}

let requestHeaderStore = new RequestHeaderStore()
export default requestHeaderStore;
