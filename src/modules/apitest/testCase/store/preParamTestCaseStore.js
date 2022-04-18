import { observable,  action } from "mobx";
import { 
    findPreParamTestCase, 
    createPreParamTestCase,
    updatePreParamTestCase
} from '../api/preParamTestCaseApi';

export class PreParamTestCaseStore {
    @observable preParamTestCaseInfo;
    @observable testCaseId = '';

    @action
    getPreParamCaseInfo = (value)=>{
        this.preParamTestCaseInfo = {...this.preParamTestCaseInfo,...value};
    }

    @action
    findPreParamTestCase = async (id) => {
        this.testCaseId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findPreParamTestCase(param)
        if( res.code === 0){
            this.getPreParamCaseInfo(res.data)
            return res.data;
        }
    }

    @action
    createPreParamTestCase = async (values) => {
        values.testcase = {id: this.testCaseId}
        values.id =  this.testCaseId;

        await createPreParamTestCase(values)
    }

    @action
	updatePreParamTestCase = async (values) => {
        values.testcase = {id: this.testCaseId}
        values.id= this.testCaseId;

		await updatePreParamTestCase(values)
    }
    
}

export const PREPARAM_TESTCASE_STORE = 'preParamTestCaseStore';