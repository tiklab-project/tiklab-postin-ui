import {observable, action} from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * 接口状态 store
 */
class ApxMethodStatusStore {

    @observable apiStatusList = [];
    @observable apiStatusSourceList=[];
    @observable apiStatusId ;
    @observable	totalRecord ;
    @observable params = {};
    @observable statusType;
    @observable dataLength;

    @action
    setList = (values) => {
        this.apiStatusList = [...values]
    }

    @action
    addNewList = (list) => {
        this.apiStatusList = [...list];
    }

    /**
     * 根据查询对象按分页查询接口列表
     */
    @action
    findApiStatusPage = async (value) => {
        this.params = {
            orderParams:[{name:'name', orderType:'asc'}],
            ...value
        }
        const res = await Axios.post("/apiStatus/findApiStatusPage",this.params);
        if(res.code === 0 ) {
            this.apiStatusList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res.data;
        }
    }

    /**
     * 查询列表
     */
    @action
    findApiStatusList = async (param) => {
        this.params = {
            ...param,
            orderParams:[{name:'name', orderType:'asc'}],
        }

        const res = await Axios.post("/apiStatus/findApiStatusList",this.params);
        if(res.code === 0 ) {
            return  res.data;
        }
    }

    /**
     * 通过id查询单个接口状态
     */
    @action
    findApiStatus = async (id) => {
        this.apiStatusId=id;
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiStatus/findApiStatus",param);
        if(res.code === 0){
            this.statusType = res.data.type;
            return res.data;
        }
    }

    /**
     * 创建接口状态
     */
    @action
    createApiStatus = async (values) =>  await Axios.post("/apiStatus/createApiStatus",values);

    /**
     * 更新接口状态
     */
    @action
    updateApiStatus = async (values) => {
        values.id = this.apiStatusId;
        values.type=this.statusType;

        const res = await Axios.post("/apiStatus/updateApiStatus",values);
        if( res.code === 0 ){
            return this.findApiStatusList();
        }
    }

    /**
     * 删除接口状态
     */
    @action
    deleteApiStatus = async (id) => {
        const param = new FormData();
        param.append('id', id);

        return await Axios.post("/apiStatus/deleteApiStatus",param)

    }
}

let apxMethodStatusStore = new ApxMethodStatusStore();
export default apxMethodStatusStore;
