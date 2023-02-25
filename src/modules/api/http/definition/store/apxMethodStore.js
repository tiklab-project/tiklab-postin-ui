import {observable, action, toJS} from "mobx";
import {
    findMethodPage,
    createMethod,
    findMethod,
    updateMethod,
    deleteMethod,
    findMethodListByApix
} from '../api/apxMethodApi'

export class ApxMethodStore {

    @observable apxMethodList = [];
    @observable apiInfo={};
    @observable versionList = [];
    @observable apxMethodId = '';
    @observable categoryId= '';
    @observable versionId = '';
    @observable	totalRecord = "";
    @observable params = {};
    @observable verParams= {};
    @observable currentVersion = {};
    @observable oldVersion = {};
    @observable isAddTab = false;

    @action
    setIsAddTab = (data) =>{
        this.isAddTab = data
    }

    //根据查询对象按分页查询接口列表
    @action
    findApxMethodPage = async (values) => {
        this.params = {
            orderParams:[{name:'name', orderType:'asc'}],
            ...values
        }

        const res = await findMethodPage(this.params);
        if(res.code === 0 ) {
            this.apxMethodList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return  res;
        }
    }

    @action
    findApxMethodListByApix = async (id) => {
        let param ={
            categoryId:id,
            protocolType:'http',
            apiUid:null
        }
        const res = await findMethodListByApix(param);
        if(res.code === 0 ) {
            this.apxMethodList = res.data;
            return  res;
        }
    }



    //根据接口ID查找接口
    @action
    findApxMethod = async (id) => {
        this.apxMethodId = id;
        const param = new FormData();
        param.append('id', id);
        const res = await findMethod(param);
        if( res.code === 0 ){
            this.apiInfo = res.data;
            return res.data;
        }
    }

    //创建接口
    @action
    createApxMethod = async (values) => {
        const res = await createMethod(values)
        if( res.code === 0 ){
            // this.findApxMethodPage(this.params);

            return res.data
        }
    }

    //更新接口
    @action
	updateApxMethod = async (values) =>  await updateMethod(values)


    //接口删除
    @action
	deleteApxMethod = async (id) => {
        const param = new FormData();
        param.append('id', id);
		const res = await deleteMethod(param)
        if( res.code === 0 ){
            // this.findApxMethodPage(this.params);
            return res
        }
    }


}


export const APXMETHOD_STORE = 'apxMethodStore';
