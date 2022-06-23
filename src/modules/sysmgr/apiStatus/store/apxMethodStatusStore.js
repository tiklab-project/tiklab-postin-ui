import {observable, action} from "mobx";
import {
    findApiStatusPage,
    createApiStatus,
    findApiStatus,
    updateApiStatus,
    deleteApiStatus,
    findAllApiStatus,
    findApiStatusList
} from '../api/apxMethodStatus'

export class ApxMethodStatusStore {

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
            return res.data;
        }
    }

    @action
    findApiStatusList = async (value) => {
        this.params = {
            orderParams:[{name:'name', orderType:'asc'}],
        }

        const res = await findApiStatusList(this.params);

        let newRow = [{id:"apiStatusInitRow"}]

        if(res.code === 0 ) {
            this.dataLength = res.data.length
            this.apiStatusSourceList = res.data;
            if(res.data.length===0){
                this.apiStatusList=newRow
            }else {
                this.apiStatusList=res.data;
            }

            return  res.data;
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
            return this.findApiStatusList();
        }
    }
      

    //更新接口
    @action
    updateApiStatus = async (values) => {
        values.id = this.apiStatusId;
        values.type=this.statusType;

        const res = await updateApiStatus(values);
        if( res.code === 0 ){
            return this.findApiStatusList();
        }
    }

    //接口删除
    @action
    deleteApiStatus = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await  deleteApiStatus(param)
        if(res.code === 0){
            this.findApiStatusList();
        }
    }
}


export const APXMETHOD_STATUS_STORE = 'apxMethodStatusStore';
