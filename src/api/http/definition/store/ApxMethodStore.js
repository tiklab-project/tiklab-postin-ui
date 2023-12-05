import {observable, action} from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 接口store
 */
class ApxMethodStore {

    @observable apxMethodList = [];
    @observable versionList = [];
    @observable apiId = '';
    @observable categoryId= '';
    @observable versionId = '';
    @observable	totalRecord = "";
    @observable verParams= {};
    @observable currentVersion = {};
    @observable oldVersion = {};

    /**
     * 根据查询对象按分页查询接口列表
     */
    @action
    findApxMethodPage = async (values) => {
        let params = {
            orderParams:[{name:'name', orderType:'asc'}],
            ...values
        }

        const res = await Axios.post("/http/findHttpApiPage",params);
        if(res.code === 0 ) {
            this.apxMethodList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return  res;
        }
    }

    /**
     * 查询接口列表
     */
    @action
    findApxMethodListByApix = async (value) => {
        let param ={
            protocolType:'http',
            apiUid:null,
            ...value
        }
        const res = await Axios.post("/http/findHttpApiListByApix",param);
        if(res.code === 0 ) {
            this.apxMethodList = res.data;
            return  res;
        }
    }

    //根据接口ID查找接口
    @action
    findApxMethod = async (id) => {
        this.apiId = id;
        const param = new FormData();
        param.append('id', id);
        const res = await Axios.post("/http/findHttpApi",param);
        if( res.code === 0 ){
            return res.data;
        }
    }

    /**
     * 创建接口
     */
    @action
    createApxMethod = async (values) => {
        const res = await Axios.post("/http/createHttpApi",values)
        if( res.code === 0 ){
            return res.data
        }
    }

    /**
     * 更新接口
     */
    @action
	updateApxMethod = async (values) =>  await Axios.post("/http/updateHttpApi",values)


    /**
     * 删除接口
     */
    @action
	deleteApxMethod = async (id) => {
        const param = new FormData();
        param.append('id', id);
		const res = await Axios.post("/apx/deleteApix",param)
        if( res.code === 0 ){
            return res
        }
    }


    @action
    findServerUrl = async () =>{
        const res = await Axios.get("/http/findServerUrl")
        if( res.code === 0 ){
            return res.data
        }
    }

}


let apxMethodStore = new ApxMethodStore();
export default apxMethodStore;