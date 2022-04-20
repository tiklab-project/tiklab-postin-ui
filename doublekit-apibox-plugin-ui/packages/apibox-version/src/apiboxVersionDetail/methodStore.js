/**
 * @description：
 * @date: 2021-07-23 15:16
 */
import {observable, action, toJS} from "mobx";
import {
    findMethodVersionPage,
    queryVersionDetail
} from './methodApi'

class ApxMethodStore {
    @observable dataList

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


    //版本详情
    @action
    queryVersionDetail = (id) => {
        this.versionId = id;
        const param = new FormData();
        param.append('versionId', id);
        return new Promise(function(resolve, reject){
            queryVersionDetail(param).then((res) => {
                if( res.code === 0 ){
                    resolve(res.data)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

}
const apxMethodStore = new ApxMethodStore();
export default apxMethodStore;
