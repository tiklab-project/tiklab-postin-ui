import { observable,  action } from "mobx";
import { 
    findQueryParamTestCaseList, 
    createQueryParamTestCase , 
    findQueryParamTestCase ,
    updateQueryParamTestCase, 
    deleteQueryParamTestCase 
} from '../api/queryParamTestCaseApi';

export class QueryParamTestCaseStore {
    @observable queryParamTestCaseList = [];
    @observable queryParamTestCaseInfo = [];
    @observable queryParamTestCaseDataSource = [];
    @observable testCaseId = '';
    @observable mockValueData = [];
    @observable dataLength;
   
    @action 
    setList = (values) => {
        this.queryParamTestCaseList = [...values];
    }

    @action
    processQueryCaseList = (data)=>{
        if(!data){
            return;
        }

        const newRow =[ { id: 'QueryParamTestCaseInitRow'}];

        this.queryParamTestCaseDataSource = data;
        this.queryParamTestCaseList=[...data,...newRow];
    }

    @action
    findQueryParamTestCaseList = async (id) => {
        this.testCaseId = id;
        const params = {
            testcaseId: id,
            orderParams:[{name:'paramName',orderType:'asc' }],
        }

        const res = await findQueryParamTestCaseList(params);
        if( res.code === 0) {
            this.dataLength = res.data.length;
            this.processQueryCaseList(res.data);

            return res.data;
        }
    }

    @action
    findQueryParamTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findQueryParamTestCase(param);
        if(res.code === 0) {
            this.queryParamTestCaseInfo = res.data;
            return res
        }
    }

    @action
    createQueryParamTestCase = async (values) => {
        values.httpCase = {id:this.testCaseId}

        const res = await createQueryParamTestCase(values)
        if(res.code === 0){
            this.findQueryParamTestCaseList(this.testCaseId);
        }
    }

    @action
	updateQueryParamTestCase = async (values) => {
		const res = await updateQueryParamTestCase(values)
        if(res.code === 0){
            return  this.findQueryParamTestCaseList(this.testCaseId);
        }
    }

    @action
	deleteQueryParamTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

		const res = await deleteQueryParamTestCase(param)
        if(res.code === 0){
            this.findQueryParamTestCaseList(this.testCaseId);
        }
    }

}

export const QUERYPARAM_TESTCASE_STORE = 'queryParamTestCaseStore';