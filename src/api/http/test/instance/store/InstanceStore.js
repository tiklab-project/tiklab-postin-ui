import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 历史实例 store
 */
export class InstanceStore {

    @observable instanceList = [];
    @observable instanceId = '';
    @observable	totalRecord = "";
    @observable params
    @observable responseBodyData;
    @observable responseHeaderData;
    @observable requestBodyData;
    @observable requestHeaderData;
    @observable assertList;

    /**
     * 查询历史列表 带分页
     */
    @action
    findInstancePage = async (id,value) => {
        this.params = {
            ...value,
            httpCaseId:id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await Axios.post("/testInstance/findTestInstancePage",this.params );
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res
        }
    }

    /**
     * 查询历史列表
     */
    @action
    findInstanceList = async (values) =>{
            let params = {
            orderParams:[{name:'createTime', orderType:'asc' }],
            ...values
        }

        const res = await Axios.post("/testInstance/findTestInstanceGroupByCreateTime",params);
        if(res.code===0){
            this.instanceList = res.data;
            return res.data;
        }
    }

    @action
    findInstance = async (id) => {
        this.instanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/testInstance/findTestInstance",param)
        if(res.code === 0){
            return res.data;
        }
    }
    
    @action
    createInstance = async (values) => {
        const res = await Axios.post("/testInstance/createTestInstance",values)
        if(res.code === 0) {

            return res.data
        }
    }

    @action
	deleteInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/testInstance/deleteTestInstance",param)
        if(res.code===0){
            return res
        }
    }

    @action
    deleteAllInstance = async (workspaceId) => {
        const param = new FormData();
        param.append('workspaceId', workspaceId);

        await Axios.post("/testInstance/deleteAllTestInstance",param)
    }


}

export const INSTANCE_STORE = 'instanceStore';
// let instanceStore = new InstanceStore()
// export default instanceStore;