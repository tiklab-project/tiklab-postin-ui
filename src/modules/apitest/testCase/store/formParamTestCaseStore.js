import { observable,  action } from "mobx";
import { 
    findFormParamTestCaseList, 
    createFormParamTestCase , 
    findFormParamTestCase ,
    updateFormParamTestCase, 
    deleteFormParamTestCase 
} from '../api/formParamTestCaseApi';

export class FormParamTestCaseStore {
    @observable formParamTestCaseList = [];
    @observable formParamTestCaseInfo = [];
    @observable formParamTestCaseDataSource = [];
    @observable testCaseId = '';
    @observable dataLength;

    @action 
    setList = (values) => {
        this.formParamTestCaseList = [...values];
    }

    //处理list
    @action
    processFormList = (data)=>{
        if(!data){
            return;
        }

        const newRow =[ { id: 'InitNewRowId'}];

        this.formParamTestCaseDataSource = data;
        this.formParamTestCaseList=[...data,...newRow];
    }

    @action
    findFormParamTestCaseList = async (id) => {
        this.testCaseId = id;
        const params = {
            testcaseId: id,
            orderParams:[{ name:'paramName', orderType:'asc' }],
        }

        const res = await findFormParamTestCaseList(params);
        if(res.code === 0) {
            this.dataLength = res.data.length;
            this.processFormList(res.data);
            return  res.data;
        }
    }

    @action
    findFormParamTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFormParamTestCase(param)
        if( res.code === 0){
            this.formParamTestCaseInfo = res.data;
            return res.data;
        }
    }

    @action
    createFormParamTestCase = async (values) => {
        values.httpCase = {id:this.testCaseId};

        const res = await createFormParamTestCase(values);
        if( res.code === 0){
            this.findFormParamTestCaseList(this.testCaseId);
        }
    }

    @action
	updateFormParamTestCase = async (values) => {
		const res = await updateFormParamTestCase(values)
        if(res.code === 0){
            return this.findFormParamTestCaseList(this.testCaseId);
        }
    }

    @action
	deleteFormParamTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

		const res = await deleteFormParamTestCase(param);
        if(res.code === 0){
            this.findFormParamTestCaseList(this.testCaseId);
        }
    }

}


export const FORMPARAM_TESTCASE_STORE = 'formParamTestCaseStore';