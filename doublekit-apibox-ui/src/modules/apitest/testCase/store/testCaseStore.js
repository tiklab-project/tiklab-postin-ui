import { observable,  action  } from "mobx";
import qs from 'qs';
import {
    createTestCase,
    updateTestCase,
    deleteTestCase,
    findTestCase,
    findTestCasePage,
    findTestCaseList,
    createTestcaseWithNest,
} from '../api/testCaseApi';
import {AssertCommonStore} from "../../common/assertCommonStore";

let assertCommonStore = new AssertCommonStore();

export class TestCaseStore {
    @observable testCaseList = [];
    @observable apxMethodId='';
    @observable testCaseInfo=[];
    @observable testCaseId = '';
    @observable status = '';
    @observable time = '';
    @observable assertResponse = [];
    @observable requestBodyCaseData;
    @observable requestHeaderCaseData;
    @observable responseHeaderCaseData;
    @observable responseBodyCaseData;


    @action
    findTestCasePage = async (id)=>{
        this.apxMethodId = id;
        const params = {
            httpId:id,
            orderParams:[{name:'name', orderType:'asc'}],
        }

        const res = await findTestCasePage(params)
        if( res.code === 0){
            this.testCaseList = res.data.dataList;
            return res.data
        }
    }

    @action
    findTestCaseList = async (id) =>{
        let params = { "httpId":id }

        const res = await findTestCaseList(params)
        if(res.code===0){
            this.testCaseList = res.data
            return res.data
        }
    }

    @action
    createTestCase = async (values) => {
        const res = await createTestCase(values);
        if( res.code === 0){
            this.findTestCasePage(this.apxMethodId);
        }
    }

    //保存为用例
    @action
    createTestcaseWithNest = async (values) => {
        const res = await createTestcaseWithNest(values);
        if( res.code === 0){
            return res
        }
    }

    @action
    updateTestCase = async (values) => {
        values.id = this.testCaseId

        const res = await updateTestCase(values);
        if( res.code === 0){
            this.findTestCasePage(this.apxMethodId)
        }
    }

    @action
    deleteTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteTestCase(param);
        if( res.code === 0){
            this.findTestCasePage(this.apxMethodId);
        }
    }

    @action
    findTestCase = async (id) => {
        this.testCaseId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findTestCase(param);
        if( res.code === 0){
            this.testCaseInfo = res.data;
            return  res.data;
        }
    }


    @action
    getRequestInfo = (data) => {
        this.requestType = data.http;

        if(data.params&&Object.keys(data.params).length>0){
            this.baseInfo = data.baseUrl+data.url+'?'+qs.stringify(data.params)
        }else {
            this.baseInfo = data.baseUrl+data.url
        }

        this.requestHeaderCaseData = JSON.stringify(data.headers);
        this.requestBodyCaseData = data.bodys;
    }

    @action
    getResponseInfo = async (res,assertData) => {
        this.status = res.status;
        const headers = res.headers;
        const body = res.data;

        const assertNeedData = {
            "status":res.status,
            "header":headers,
            "body":body,
            "assertList":assertData
        }

        debugger
        // 断言值的比较，结果返回 1，-1
        let allAssertResult=assertCommonStore.assertIsOrNotSuccess(assertNeedData)



        this.responseHeaderCaseData = JSON.stringify(headers);
        this.responseBodyCaseData=body;
        this.assertResponse = assertData;

        //创建instance所需的参数
        let allValueInfo = {
            'statusCode':this.status,
            'result':allAssertResult,
            "requestType":this.requestType,
            'requestInstance':{
                'requestBase':this.baseInfo,
                'requestHeader':this.requestHeaderCaseData,
                'requestParam':this.requestBodyCaseData
            },
            'responseInstance':{
                'responseHeader':JSON.stringify(headers),
                'responseBody':JSON.stringify(body)
            },
            'assertInstanceList':assertData
        }

        return allValueInfo
    }


    @action
    getTime = (time) =>{
        this.time = time;
    }


}

export const TESTCASESTORE = 'testCaseStore';
