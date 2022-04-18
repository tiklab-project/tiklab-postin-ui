import { observable,  action } from "mobx";
import {
    findFormUrlencodedTestCaseList,
    createFormUrlencodedTestCase,
    findFormUrlencodedTestCase,
    updateFormUrlencodedTestCase,
    deleteFormUrlencodedTestCase
} from '../api/formUrlencodedTestCaseApi'

export class FormUrlencodedTestCaseStore {

    @observable formUrlencodedTestCaseList = [];
    @observable formUrlencodedTestCaseInfo;
    @observable formUrlencodedTestCaseDataSource = [];
    @observable testCaseId;
    @observable dataLength;

    @action
    setList = (values) => {
        this.formUrlencodedTestCaseList = [...values];
    }

    //处理list
    @action
    processFormUrlencodedList = (data)=>{
        if(!data){
            return;
        }

        const newRow =[ { id: 'FormUrlencodedTestCaseInitRow'}];

        this.formUrlencodedTestCaseDataSource = data;
        this.formUrlencodedTestCaseList=[...data,...newRow];
    }

    @action
    findFormUrlencodedTestCaseList = async (id) => {
        this.testCaseId = id;
        const params = {
            testcaseId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }

        const res = await findFormUrlencodedTestCaseList(params);
        if(res.code === 0) {
            this.dataLength = res.data.length
            this.processList(res.data)
            return  res.data;
        }  
    }

    @action
    findFormUrlencodedTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findFormUrlencodedTestCase(param);
        if( res.code === 0){
           return  this.formUrlencodedTestCaseInfo = res.data;
        }
    }
    
    @action
    createFormUrlencodedTestCase = async (values) => {
        values.testcase = {id: this.testCaseId}
        const res = await createFormUrlencodedTestCase(values)
        if( res.code === 0){
            return this.findFormUrlencodedTestCaseList(this.testCaseId);
        }
    }

    @action
    updateFormUrlencodedTestCase = async (values) => {
        const res = await updateFormUrlencodedTestCase(values)
        if( res.code === 0){
            return this.findFormUrlencodedTestCaseList(this.testCaseId);
        }
    }

    @action
    deleteFormUrlencodedTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteFormUrlencodedTestCase(param)
        if( res.code === 0){
            this.findFormUrlencodedTestCaseList(this.testCaseId);
        }
    }

}

export const FORM_URLENCODED_TESTCASE_STORE = 'formUrlencodedTestCaseStore';
