/**
 * @description：
 * @date: 2021-07-26 15:23
 */

import {observable, action, toJS} from "mobx";
import {
    findMethodVersionPage,
    contrastVersion
} from './methodApi'

class ApxMethodStore {
    @observable versionList=[];
    @observable currentVersion = {};
    @observable oldVersion = {};

    //查找版本
    @action
    findVersionPage = (id,value) => {
        this.versionId = id;
        this.verParams = {
            orderParams:[{
                name:'name',
                orderType:'asc'
            }],
            ...value
        }
        const data = Object.assign(toJS(this.verParams),{onVersionId:id})
        const that = this;
        return new Promise(function(resolve, reject){
            findMethodVersionPage(data).then(res => {
                if(res.code === 0 ) {
                    that.versionList = res.data.dataList;
                    resolve(res);
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }


    //版本对比
    @action
    compareVersion = (currentId,oldId) => {
        const params = {
            currentId:currentId,
            oldId:oldId
        }
        const that = this;
        return new Promise(function (resolve, reject){
            contrastVersion(params).then((res) => {
                console.log(res)
                if(res.code === 0){
                    that.currentVersion = res.data.currentVersion
                    that.oldVersion = res.data.oldVersion;
                    resolve(res.data)
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

}
const apxMethodStore = new ApxMethodStore();
export default apxMethodStore;
