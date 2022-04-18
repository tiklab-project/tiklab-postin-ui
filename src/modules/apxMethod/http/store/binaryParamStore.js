import { observable,  action } from "mobx";
import {
    findBinaryParamList,
    createBinaryParam,
    findBinaryParam,
    updateBinaryParam,
    deleteBinaryParam,
    findBinaryParamByte
} from '../api/binaryParamApi'

export class BinaryParamStore {

    @observable binaryParamList = [];
    @observable binaryParamInfo = [];
    @observable methodId;

    @action
    findBinaryParamList = async (id) => {
        this.methodId = id;
        const params = {methodId: id}
        const res = await findBinaryParamList(params);
        if(res.code === 0) {
            let data = res.data;
            let newData = data&&data.map((item,index)=>{
                let fileInfo = {
                    uid:item.id,
                    name:item.fileName,
                    // url:`${base_url}file/${item.fileName}`,
                    status: 'done',
                }

                return fileInfo
            })
            return this.binaryParamList = newData;
        }  
    }

    @action
    findBinaryParam = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findBinaryParam(param);
        if( res.code === 0){
           return  this.binaryParamInfo = res.data;
        }
    }


    @action
    createBinaryParam = async (values) => {
        const res = await createBinaryParam(values)
        if( res.code === 0){
            return this.findBinaryParamList(this.methodId);
        }
    }

    @action
    updateBinaryParam = async (values) => {
        const res = await updateBinaryParam(values)
        if( res.code === 0){
            return this.findBinaryParamList(this.methodId);
        }
    }

    @action
    deleteBinaryParam = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteBinaryParam(param)
        if( res.code === 0){
            return this.findBinaryParamList(this.methodId);
        }
    }

    @action
    findBinaryParamByte = async (id)=>{
        const params = {methodId: id}
        const res = await findBinaryParamByte(params)
        if( res.code === 0){
            debugger
            console.log(res)
        }
    }

}

export const BINARY_PARAM_STORE = 'binaryParamStore';
