import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * 定义
 * http
 * formUrl store
 */
class FormUrlencodedStore {

    @observable formUrlencodedList = [];
    @observable formUrlencodedInfo;
    @observable formUrlencodedDataSource = [];
    @observable apxMethodId;
    @observable dataLength;

    @action
    setList = (values) => {
        this.formUrlencodedList = [...values]
    }

    /**
     * 查询formUrl列表
     */
    @action
    findFormUrlencodedList = async (id) => {
        this.apxMethodId = id;
        const params = {
            httpId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const newRow =[ { id: 'InitNewRowId'}];
        const res = await Axios.post("/formUrlencoded/findFormUrlencodedList",params);
        if(res.code === 0) {
            this.dataLength = res.data.length
            this.formUrlencodedDataSource = res.data;
            if( res.data.length === 0 ){
                this.formUrlencodedList= newRow;
            }else {
                this.formUrlencodedList = [...res.data,...newRow];
            }
            return  res.data;
        }  
    }

    /**
     * 通过id查询单个formUrl
     */
    @action
    findFormUrlencoded = async (id) => {
        const params = new FormData();
        params.append('id', id);

        const res = await Axios.post("/formUrlencoded/findFormUrlencoded",params);
        if( res.code === 0){
            this.formUrlencodedInfo = res.data;
           return res.data;
        }
    }

    /**
     * 创建formUrl
     */
    @action
    createFormUrlencoded = async (params) => {
        params.http = {id: this.apxMethodId}

        const res = await Axios.post("/formUrlencoded/createFormUrlencoded",params)
        if( res.code === 0){
            return this.findFormUrlencodedList(this.apxMethodId);
        }
    }

    /**
     * 更新formUrl
     */
    @action
    updateFormUrlencoded = async (params) => {
        const res = await Axios.post("/formUrlencoded/updateFormUrlencoded",params)
        if( res.code === 0){
            return this.findFormUrlencodedList(this.apxMethodId);
        }
    }

    /**
     * 删除formUrl
     */
    @action
    deleteFormUrlencoded = async (id) => {
        const params = new FormData();
        params.append('id', id);
        const res = await Axios.post("/formUrlencoded/deleteFormUrlencoded",params)
        if( res.code === 0){
            this.findFormUrlencodedList(this.apxMethodId);
        }
    }

}

let formUrlencodedStore = new FormUrlencodedStore()
export default formUrlencodedStore;
