/**
 * @description：
 * @date: 2021-07-23 15:16
 */
import {observable, action, toJS} from "mobx";
import {
    findMethodVersionPage,
    deleteMethod
} from './methodApi'

class ApxMethodStore {
    @observable versionList=[];
    @observable	totalRecord = "";
    @observable verParams = {}
    @observable length = 0;

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
                console.log(res)
                if(res.code === 0 ) {
                    that.versionList = res.data.dataList;
                    that.totalRecord = res.data.totalRecord;
                    resolve(res);
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    //版本删除
    @action
    deleteVersion = (id) => {
        const param = new FormData();
        param.append('id', id);

        deleteMethod(param).then((res) => {
            if( res.code === 0 ){
                this.findVersionPage(this.versionId,this.verParams);
            }
        }).catch(error => {
            console.log(error)
        })
    }
}
const apxMethodStore = new ApxMethodStore();
export default apxMethodStore;
