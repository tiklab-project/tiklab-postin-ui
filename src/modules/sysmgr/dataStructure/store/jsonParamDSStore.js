/**
 * @description：
 * @date: 2021-07-30 09:13
 */
import { observable,  action , toJS} from "mobx";
import {
    findJsonParamDSListTree,
    createJsonParamDS,
    findJsonParamDS,
    updateJsonParamDS,
    deleteJsonParamDS
} from '../api/jsonParamDSApi'

export class JsonParamDSStore {

    @observable jsonParamDSList = [];
    @observable jsonParamDSDataSource = [];
    @observable jsonParamDSInfo = [];
    @observable dataStructureId = '';
    @observable jsonParamDSId= '';

    @action
    addList = (values) => {
        this.jsonParamDSList = [...this.jsonParamDSList,...values]
    }
    @action
    setList = (values) => {
        this.jsonParamDSList = [...values]
    }

    @action
    findJsonParamDSListTree = (id) => {
        this.dataStructureId = id;
        const params = {
            dataStructureId: id,
            orderParams:[{
                name:'paramName',
                orderType:'asc'
            }],
        }
        const that = this;
        return new Promise(function(resolve, reject){
            findJsonParamDSListTree(params).then(res => {
                if(res.code === 0) {
                    that.jsonParamDSDataSource = res.data;
                    if( res.data.length === 0){
                        that.jsonParamDSList=[{id: '1'}]
                    }else {
                        that.jsonParamDSList = res.data;
                    }
                    resolve(res.data);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findJsonParamDS = (id) => {
        this.jsonParamDSId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findJsonParamDS(param).then((res) => {
                if( res.code === 0){
                    that.jsonParamDSInfo = res.data;
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }


    @action
    createJsonParamDS = (values) => {
        values.dataStructureId = {
            id:this.dataStructureId
        }
        createJsonParamDS(values).then((res) => {
            if( res.code === 0){
                this.findJsonParamDSListTree(this.dataStructureId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    updateJsonParamDS = (values) => {
        updateJsonParamDS(values).then((res) => {
            if( res.code === 0){
                this.findJsonParamDSListTree(this.dataStructureId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    deleteJsonParamDS = (id) => {
        const param = new FormData();
        param.append('id', id);

        deleteJsonParamDS(param).then((res) => {
            if( res.code === 0){
                this.findJsonParamDSListTree(this.dataStructureId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    setJsonParamDSListChild = (parentId) => {
        debugger
        const pid = ({
            id: parentId
        })
        const newChild = {
            id:'c1',
            parent: pid
        }
        const loop = (data,newChild)=>{
            let newdata = data.map((item) => {
                if(item.id && item.id === parentId) {
                    if(item.children === null){
                        item.children = [newChild]
                    }else {
                        item.children.push({
                            ...newChild,
                        })
                    }
                }else if(item.children && item.children.length > 0){
                    loop(item.children, newChild)
                }
                return item
            })
            return newdata;
        }
        const data = toJS(this.jsonParamDSList);
        let result = loop(data,newChild);
        this.jsonParamDSList = result;

    }

}



export const JSONPARAMDS_STORE = 'jsonParamDSStore';
