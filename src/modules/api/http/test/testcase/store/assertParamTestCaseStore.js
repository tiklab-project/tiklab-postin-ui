import { observable,  action } from "mobx";
import { 
    findAssertParamTestCaseList, 
    createAssertParamTestCase , 
    findAssertParamTestCase ,
    updateAssertParamTestCase, 
    deleteAssertParamTestCase 
} from '../api/assertParamTestCaseApi';

export class AssertParamTestCaseStore {
    @observable assertParamTestCaseList = [];
    @observable assertParamTestCaseInfo = [];
    @observable assertParamTestCaseDataSource = [];
    @observable testCaseId = '';
    @observable dataLength;
   
    @action 
    setList = (values) => {
        this.assertParamTestCaseList = [...values]
    }

    @action
    findAssertParamTestCaseList = async (id) => {
        this.testCaseId = id;
        const params = {
            testcaseId: id,
            orderParams:[{name:'propertyName',orderType:'asc'}],
        }

        const newRow =[ { id: 'InitNewRowId'}]

        const res = await findAssertParamTestCaseList(params);
        if(res.code === 0){
            this.dataLength = res.data.length;
            this.assertParamTestCaseDataSource = res.data;
            this.assertParamTestCaseList = [...res.data,...newRow]

            return  res.data;
        }
    }

    @action
    findAssertParamTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAssertParamTestCase(param);
        if( res.code === 0){
            this.assertParamTestCaseInfo = res.data;
            return res.data
        }
    }

    @action
    createAssertParamTestCase = async (values) => {
        values.httpCase = {id:this.testCaseId}

        const res = await createAssertParamTestCase(values)
        if( res.code === 0){
            return this.findAssertParamTestCaseList(this.testCaseId);
        }
    }

    @action
	updateAssertParamTestCase = async (values) => {
		const res = await updateAssertParamTestCase(values)
        if( res.code === 0){
            return this.findAssertParamTestCaseList(this.testCaseId);
        }
    }

    @action
	deleteAssertParamTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

		const res = await deleteAssertParamTestCase(param)
        if( res.code === 0){
            this.findAssertParamTestCaseList(this.testCaseId);
        }
    }

    
}


export const ASSERTPARAM_TESTCASE_STORE = 'assertParamTestCaseStore';