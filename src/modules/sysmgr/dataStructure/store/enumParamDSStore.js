/**
 * @description：
 * @date: 2021-07-29 18:24
 */

import { observable,  action } from "mobx";
import {
    findEnumParamListDS,
    createEnumParamDS,
    findEnumParamDS,
    updateEnumParamDS,
    deleteEnumParamDS,
} from '../api/enumParamApi'

export class EnumParamDSStore {

    @observable enumParamDSList = [];
    @observable enumParamDSInfo = [];
    @observable enumParamDSDataSource = [];
    @observable dataStructureId = '';
    @observable enumParamDSId= '';
    @observable dataLength = '';

    @action
    addList = (values) => {
        this.enumParamDSList = [...this.enumParamDSList,...values]
    }
    @action
    setList = (values) => {
        this.enumParamDSList = [...values]
    }

    @action
    findEnumParamDSList = (id) => {
        this.dataStructureId = id;
        const params = {
            dataStructureId: id,
            orderParams:[{
                name:'paramName',
                orderType:'asc'
            }],
        }
        const that = this;
        const newRow =[ { id: 'EnumParamDSInitRow'}]
        return new Promise(function(resolve, reject){
            findEnumParamListDS(params).then(res => {
                if(res.code === 0) {
                    that.dataLength = res.data.length
                    that.enumParamDSDataSource = res.data;
                    if( res.data.length === 0 ){
                        that.enumParamDSList= newRow;
                    }else {
                        that.enumParamDSList = [...that.enumParamDSDataSource,...newRow];
                    }
                    resolve(res.data);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findEnumParamDS = (id) => {
        this.enumParamDSId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findEnumParamDS(param).then((res) => {
                if( res.code === 0){
                    that.enumParamDSInfo = res.data;
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }


    @action
    createEnumParamDS = (values) => {
        values.dataStructure = {
            id: this.dataStructureId
        }
        return createEnumParamDS(values).then((res) => {
            if( res.code === 0){
                return  this.findEnumParamDSList(this.dataStructureId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    updateEnumParamDS = (values) => {
        return updateEnumParamDS(values).then((res) => {
            if( res.code === 0){
                return this.findEnumParamDSList(this.dataStructureId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    deleteEnumParamDS = (id) => {
        const param = new FormData();
        param.append('id', id);

        deleteEnumParamDS(param).then((res) => {
            if( res.code === 0){
                this.findEnumParamDSList(this.dataStructureId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const ENUMPARAMDS_STORE = 'enumParamDSStore';
