import { observable,  action } from "mobx";
import { 
    findRequestHeaderTestCaseList, 
    createRequestHeaderTestCase , 
    findRequestHeaderTestCase ,
    updateRequestHeaderTestCase, 
    deleteRequestHeaderTestCase 
} from '../api/requestHeaderTestCaseApi';

export class RequestHeaderTestCaseStore {
    @observable requestHeaderTestCaseList = [];
    @observable requestHeaderTestCaseInfo = [];
    @observable headerCaseDataSource = [];
    @observable testCaseId = '';
    @observable headerNameData = [];
    @observable dataLength

    @action 
    setList = (values) => {
        this.requestHeaderTestCaseList = [...values];
    }

    //处理list
    @action
    processHeaderCaseList = (data)=>{
        if(!data){
            return;
        }

        const newRow =[ { id: 'RequestHeaderTestCaseInitRow'}];

        this.headerCaseDataSource = data;
        this.requestHeaderTestCaseList=[...data,...newRow];
    }

    @action
    findRequestHeaderTestCaseList = async (id) => {
        this.testCaseId = id;
        const params = {
            testcaseId: id,
            orderParams:[{name:'headerName',orderType:'asc'}],
        }

        const res = await findRequestHeaderTestCaseList(params);
        if( res.code === 0){
            this.dataLength = res.data.length
            this.processHeaderCaseList(res.data)
            return res.data
        }
    }

    @action
    findRequestHeaderTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findRequestHeaderTestCase(param);
        if( res.code === 0){
            this.requestHeaderTestCaseInfo = res.data;
        }
    }

    @action
    createRequestHeaderTestCase = async (values) => {
        values.testcase = {id:this.testCaseId}
        const res = await createRequestHeaderTestCase(values)
        if( res.code === 0){
           return  this.findRequestHeaderTestCaseList(this.testCaseId);
        }
    }

    @action
	updateRequestHeaderTestCase = async (values) => {
		const res = await updateRequestHeaderTestCase(values)
        if( res.code === 0){
            return this.findRequestHeaderTestCaseList(this.testCaseId);
        }
    }

    @action
	deleteRequestHeaderTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);
		const res  = await deleteRequestHeaderTestCase(param)
        if( res.code === 0){
            this.findRequestHeaderTestCaseList(this.testCaseId);
        }
    }

    @action
    getHeaderName = (data) => {
        this.headerNameData = data
    }


    
}

export const REQUESTHEADER_TESTCASE_STORE = 'requestHeaderTestCaseStore';