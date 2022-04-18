import { observable,  action } from "mobx";
import { 
    findRequestBodyTestCase, 
    createRequestBodyTestCase,
    updateRequestBodyTestCase
} from '../api/requestBodyTestCaseApi';

export class RequestBodyTestCaseStore {
    @observable requestBodyTestCaseInfo;
    @observable testCaseId = '';
    @observable requestBodyTestCaseId = '';

    @action
    getBodyType = (data) =>{
        this.requestBodyTestCaseInfo = data;
    }

    @action
    findRequestBodyTestCase = async (id) => {
        this.testCaseId = id;
        this.requestBodyTestCaseId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findRequestBodyTestCase(param)
        if(res.code === 0){
            this.requestBodyTestCaseInfo = res.data?.bodyType;
            return res.data;
        }
    }

    @action
    createRequestBodyTestCase =async (values) => {
        values.testcase = {id: this.testCaseId};
        values.id =  this.requestBodyTestCaseId;

        await createRequestBodyTestCase(values)
    }

    @action
	updateRequestBodyTestCase = async (values) => {
        values.testcase = {id: this.testCaseId};
        values.id= this.requestBodyTestCaseId;

		await updateRequestBodyTestCase(values)
    }
    
}

export const REQUESTBODY_TESTCASE_STORE = 'requestBodyTestCaseStore';