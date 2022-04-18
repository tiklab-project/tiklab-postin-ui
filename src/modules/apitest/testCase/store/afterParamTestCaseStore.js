import { observable,  action } from "mobx";
import {
    findAfterScriptTestCase,
    createAfterScriptTestCase,
    updateAfterScriptTestCase
} from '../api/afterParamTestCaseApi';

export class AfterScriptTestCaseStore {
    @observable afterScriptTestCaseInfo;
    @observable testCaseId = '';

    @action
    getAfterScriptCaseInfo = (value)=>{
        this.afterScriptTestCaseInfo = {...this.afterScriptTestCaseInfo,...value};
    }

    @action
    findAfterScriptTestCase = async (id) => {
        this.testCaseId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findAfterScriptTestCase(param);
        if( res.code === 0){
            this.getAfterScriptCaseInfo(res.data);
            return res.data;
        }
    }

    @action
    createAfterScriptTestCase = async (values) => {
        values.testcase = {id: this.testCaseId};
        values.id = this.testCaseId;

        await createAfterScriptTestCase(values)
    }

    @action
	updateAfterScriptTestCase = async (values) => {
        values.testcase = {id: this.testCaseId};
        values.id= this.testCaseId;

		await updateAfterScriptTestCase(values)
    }

}

export const BACKPARAM_TESTCASE_STORE = 'afterScriptTestCaseStore';
