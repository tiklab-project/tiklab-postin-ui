import { observable,  action } from "mobx";
import { 
    findInstancePage, 
    createInstance, 
    findInstance,
    deleteAllInstance,
    deleteInstance,
    findInstanceList
} from '../api/instanceApi'

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

    @action
    findInstancePage = async (id,value) => {
        this.params = {
            ...value,
            httpCaseId:id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findInstancePage(this.params );
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res
        }
    }

    @action
    findInstanceList = async (values) =>{
        this.param = {
            orderParams:[{name:'createTime', orderType:'asc' }],
            ...values
        }

        const res = await findInstanceList(this.param);
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

        const res = await findInstance(param)
        if(res.code === 0){
            let responseInstance = res.data.responseInstance;
            let requestInstance = res.data.requestInstance;

            this.responseBodyData = JSON.parse(responseInstance.body);
            this.responseHeaderData = responseInstance.headers;

            this.requestBodyData = requestInstance.body;
            this.requestHeaderData = requestInstance.headers;

            this.assertList = res.data.assertInstanceList;

            return res.data;
        }
    }
    
    @action
    createInstance = async (values) => {
        const res = await createInstance(values)
        if(res.code === 0) {
            this.findInstanceList(this.params );
            return res.data
        }
    }

    @action
	deleteInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteInstance(param)
    }

    @action
    deleteAllInstance = async (id) => {
        const param = new FormData();
        param.append('userId', id);

        await deleteAllInstance(param)
    }


}


export const INSTANCE_STORE = 'instanceStore';