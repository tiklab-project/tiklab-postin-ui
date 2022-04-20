import { observable,  action } from "mobx";
import { 
    findRawParamTestCase, 
    createRawParamTestCase,
    updateRawParamTestCase
} from '../api/rawParamTestCaseApi';

export class RawParamTestCaseStore {
    @observable rawParamTestCaseInfo;
    @observable testCaseId = '';
    @observable rawParamTestCaseId = '';


    @action
    processRawInfo = (data)=>{
        this.rawParamTestCaseInfo = {...this.rawParamTestCaseInfo,...data}
    }

    @action
    findRawParamTestCase = async (id) => {
        this.testCaseId = id;
        this.rawParamTestCaseId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findRawParamTestCase(param)
        if( res.code === 0){
            this.processRawInfo(res.data);
            return res.data;
        }
    }

    @action
    createRawParamTestCase = async (values) => {
        values.testcase = {id: this.testCaseId};
        values.id =  this.rawParamTestCaseId;

        await createRawParamTestCase(values)
    }

    @action
	updateRawParamTestCase =async (values) => {
        values.testcase = {id: this.testCaseId}
        values.id= this.rawParamTestCaseId;

		await updateRawParamTestCase(values)
    }
}

export const RAWPARAM_TESTCASE_STORE = 'rawParamTestCaseStore';