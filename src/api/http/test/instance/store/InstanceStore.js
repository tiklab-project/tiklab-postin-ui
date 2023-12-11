import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * 历史实例 store
 */
class InstanceStore {

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
        this.param = {
            orderParams:[{name:'createTime', orderType:'asc' }],
            ...values
        }

        const res = await Axios.post("/testInstance/findTestInstanceList",this.param);
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
            let requestInstance = res.data.requestInstance;


            if(res.data.errorMessage===null){
                let responseInstance = res.data.responseInstance;
                this.responseBodyData = JSON.parse(responseInstance.body);
                this.responseHeaderData = responseInstance.headers;
            }

            this.requestBodyData = requestInstance.body;
            this.requestHeaderData = requestInstance.headers;

            this.assertList = res.data.assertInstanceList;

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
    deleteAllInstance = async (id) => {
        const param = new FormData();
        param.append('userId', id);

        await Axios.post("/testInstance/deleteAllTestInstance",param)
    }


}


let instanceStore = new InstanceStore()
export default instanceStore;