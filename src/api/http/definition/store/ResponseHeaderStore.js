import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 定义
 * http
 * 响应头 store
 */
class ResponseHeaderStore {
    @observable responseHeaderList = [];
    @observable responseHeaderInfo;
    @observable responseHeaderDataSource = [];
    @observable apxMethodId = '';
    @observable dataLength = '';

    /**
     * 获取新的list
     */
    @action
    setList = (values) => {
        this.responseHeaderList = [...values]
    }

    /**
     * 查询响应头列表
     */
    @action
    findResponseHeaderList = async (id) => {
        this.apxMethodId = id;
        const params = {
            httpId: id,
            orderParams:[{ name:'headerName',  orderType:'asc'  }],
        }

        const newRow =[ { id: 'InitNewRowId'}]

        const res = await Axios.post("/responseHeader/findResponseHeaderList",params);
        if( res.code === 0){
            this.dataLength = res.data.length
            this.responseHeaderDataSource = res.data;

            if( res.data.length === 0){
                this.responseHeaderList=newRow;
            }else {
                this.responseHeaderList = [...res.data,...newRow];
            }
            return res.data;
        }
    }

    /**
     * 通过id查询单个响应头
     */
    @action
    findResponseHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/responseHeader/findResponseHeader",param)
        if( res.code === 0){
            this.responseHeaderInfo = res.data;
            return res.data;
        }
    }

    /**
     * 创建响应头
     */
    @action
    createResponseHeader = async (values) => {
        values.http = { id:this.apxMethodId }

        const res = await Axios.post("/responseHeader/createResponseHeader",values)
        if( res.code === 0){
            return  this.findResponseHeaderList(this.apxMethodId);
        }
    }

    /**
     * 更新响应头
     */
    @action
	updateResponseHeader = async (values) => {
		const res = await Axios.post("/responseHeader/updateResponseHeader",values)
        if( res.code === 0){
            return this.findResponseHeaderList(this.apxMethodId);
        }
    }

    /**
     * 删除响应头
     */
    @action
	deleteResponseHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);

		const res = await Axios.post("/responseHeader/deleteResponseHeader",param)
        if( res.code === 0){
            this.findResponseHeaderList(this.apxMethodId);
        }
    }

}

let responseHeaderStore = new ResponseHeaderStore()
export default responseHeaderStore;
