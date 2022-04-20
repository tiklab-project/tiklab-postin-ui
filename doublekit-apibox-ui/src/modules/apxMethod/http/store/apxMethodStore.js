import {observable, action, toJS} from "mobx";
import {
    findMethodPage,
    createMethod,
    findMethod,
    updateMethod,
    deleteMethod,
} from '../api/apxMethodApi'

export class ApxMethodStore {

    @observable apxMethodList = [];
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
        if(values.isAllApi==="isAllApi"){
            delete values.categoryId;
        }else {
            delete values.workspaceId;
        }
        delete values.isAllApi;

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

    //根据接口ID查找接口
    @action
    findApxMethod = async (id) => {
        this.apxMethodId = id;
        const param = new FormData();
        param.append('id', id);
        const res = await findMethod(param);
        if( res.code === 0 ){
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
	updateApxMethod = async (values) => {
        const res = await updateMethod(values)
        if( res.code === 0 ){
            // this.findApxMethod(this.apxMethodId);
            // this.findApxMethodPage(this.params);
            return res;
        }
    }

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

    // //查找版本
    // @action
    // findVersionPage = (id,value) => {
    //     this.versionId = id;
    //     this.verParams = {
    //         orderParams:[{name:'name', orderType:'asc'}],
    //         ...value
    //     }
    //     const data = Object.assign(toJS(this.verParams),{onVersionId:id})
    //     const that = this;
    //     return new Promise(function(resolve, reject){
    //         findMethodVersionPage(data).then(res => {
    //             if(res.code === 0 ) {
    //                 that.versionList = res.data.dataList;
    //                 that.totalRecord = res.data.totalRecord;
    //                 resolve(res);
    //             }
    //         })
    //     })
    // }
    //
    // //添加版本
    // @action
    // createVersion = (values) => createVersion(values);
    //
    // //版本删除
    // @action
    // deleteVersion = (id) => {
    //     const param = new FormData();
    //     param.append('id', id);
    //
    //     deleteMethod(param).then((res) => {
    //         if( res.code === 0 ){
    //             this.findVersionPage(this.versionId,this.verParams);
    //         }
    //     })
    // }
    //
    // //版本对比
    // @action
    // compareVersion = (currentId,oldId) => {
    //     const params = {
    //         currentId:currentId,
    //         oldId:oldId
    //     }
    //     const that = this;
    //     return new Promise(function (resolve, reject){
    //         contrastVersion(params).then((res) => {
    //             console.log(res)
    //             if(res.code === 0){
    //                 that.currentVersion = res.data.currentVersion
    //                 that.oldVersion = res.data.oldVersion;
    //                 resolve(res.data)
    //             }
    //         })
    //     })
    // }
    //
    // //版本详情
    // @action
    // queryVersionDetail = (id) => {
    //     this.versionId = id;
    //     const param = new FormData();
    //     param.append('versionId', id);
    //     return new Promise(function(resolve, reject){
    //         queryVersionDetail(param).then((res) => {
    //             if( res.code === 0 ){
    //                 resolve(res.data)
    //             }
    //         })
    //     })
    // }

}


export const APXMETHOD_STORE = 'apxMethodStore';
