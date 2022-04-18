import {observable, action} from "mobx";
import {
    findApiStatusPage,
    createApiStatus,
    findApiStatus,
    updateApiStatus,
    deleteApiStatus,
    findAllApiStatus,
} from '../api/apxMethodStatus'

export class ApxMethodStatusStore {

    @observable apiStatusList = [];
    @observable apiStatusId ;
    @observable	totalRecord ;
    @observable params = {};
    @observable statusType;

    //根据查询对象按分页查询接口列表
    @action
    findApiStatusPage = async (value) => {
        this.params = {
            orderParams:[{name:'name', orderType:'asc'}],
            ...value
        }
        const res = await findApiStatusPage(this.params);
        if(res.code === 0 ) {
            this.apiStatusList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return  res;
        }
    }

    //根据查询条件查询接口列表
    @action
    findAllApiStatus = async () => {
        const res = await findAllApiStatus();
        if(res.code === 0 ) {
            this.apiStatusList = res.data;
            return  res;
        }
    }

    //通过id查找
    @action
    findApiStatus = async (id) => {
        this.apiStatusId=id;
        const param = new FormData();
        param.append('id', id);
        const res = await findApiStatus(param);
        if(res.code === 0){
            this.statusType = res.data.type;
            return res.data;
        }
    }

    //创建接口
    @action
    createApiStatus = async (values) => {
        values.type="custom";
        const res = await createApiStatus(values)
        if (res.code === 0) {
            this.findApiStatusPage(this.params);
        }
    }
      

    //更新接口
    @action
    updateApiStatus = async (values) => {
        values.id = this.apiStatusId;
        values.type=this.statusType;
        const res = await updateApiStatus(values);
        if( res.code === 0 ){
            this.findApiStatusPage(this.params);
        }
    }

    //接口删除
    @action
    deleteApiStatus = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await  deleteApiStatus(param)
        if(res.code === 0){
            this.findApiStatusPage(this.params);
        }
    }
}


export const APXMETHOD_STATUS_STORE = 'apxMethodStatusStore';
