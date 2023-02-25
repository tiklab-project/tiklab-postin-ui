import { observable,  action } from "mobx";
import {
    findBinaryParamCaseList,
    createBinaryParamCase,
    findBinaryParamCase,
    updateBinaryParamCase,
    deleteBinaryParamCase
} from '../api/binaryParamTestCaseApi'

export class BinaryParamTestCaseStore {

    @observable binaryParamTestCaseList = [];
    @observable binaryParamTestCaseInfo = [];
    @observable testcaseId;
    @observable params

    @action
    findBinaryParamTestCaseList = async (id) => {
        this.testcaseId = id;
        const params = {testcaseId: id}

        const res = await findBinaryParamCaseList(params);
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
            return this.binaryParamTestCaseList = newData;
        }  
    }

    @action
    findBinaryParamTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findBinaryParamCase(param);
        if( res.code === 0){
           return  this.binaryParamTestCaseInfo = res.data;
        }
    }


    @action
    createBinaryParamTestCase = async (values) => {
        const res = await createBinaryParamCase(values)
        if( res.code === 0){
            return this.findBinaryParamTestCaseList(this.testcaseId);
        }
    }

    @action
    updateBinaryParamTestCase = async (values) => {
        const res = await updateBinaryParamCase(values)
        if( res.code === 0){
            return this.findBinaryParamTestCaseList(this.testcaseId);
        }
    }

    @action
    deleteBinaryParamTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteBinaryParamCase(param)
        if( res.code === 0){
            return this.findBinaryParamTestCaseList(this.testcaseId);
        }
    }

}

export const BINARY_PARAM_TESTCASE_STORE = 'binaryParamTestCaseStore';
