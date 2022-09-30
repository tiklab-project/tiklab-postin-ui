import {action, observable} from "mobx";
import qs from 'qs';
import {
    createTestCase,
    createTestcaseWithNest,
    deleteTestCase,
    findTestCase,
    findTestCaseList,
    findTestCasePage,
    updateTestCase,
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
    @observable error;
    @observable assertResponse = [];
    @observable requestBodyCaseData;
    @observable requestHeaderCaseData;
    @observable responseHeaderCaseData;
    @observable responseBodyCaseData;
    @observable methodType;

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
        let params = {
            "httpId":id,
            orderParams:[{name:'name', orderType:'asc'}],
        }

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
            return res.data
        }
    }

    //保存为用例
    @action
    createTestcaseWithNest = async (values) => {
        const res = await createTestcaseWithNest(values);
        if( res.code === 0){
            return res.data
        }
    }

    @action
    updateTestCase = async (values) => {
        values.id = this.testCaseId

        const res = await updateTestCase(values);
        if( res.code === 0){
            return res.data
        }
    }

    @action
    deleteTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteTestCase(param);
        if( res.code === 0){
            return res.data
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

        this.methodType = data.method;

        if(data.params&&Object.keys(data.params).length>0){
            this.baseInfo = data.url+'?'+qs.stringify(data.params)
        }else {
            this.baseInfo = data.url
        }

        // this.requestHeaderCaseData = JSON.stringify(data.headers);
        // this.requestBodyCaseData = data.bodys;
    }

    @action
    getResponseInfo = async (data,assertData) => {
        let res = data.res;

        this.time=data.time;
        this.status = res.status;

        let requestHeaders= res?.config?.headers;
        let requestBody =  res?.config?.data;
        const headers = res.headers;
        const body = res.data;

        const assertNeedData = {
            "status":res.status,
            "header":headers,
            "body":body,
            "assertList":assertData
        }


        // 断言值的比较，结果返回 1，-1
        let allAssertResult=assertCommonStore.assertIsOrNotSuccess(assertNeedData)

        this.requestBodyCaseData= requestBody
        this.requestHeaderCaseData=JSON.stringify(requestHeaders);

        this.responseHeaderCaseData = JSON.stringify(headers);
        this.responseBodyCaseData=JSON.stringify(body);

        this.assertResponse = assertData;

        //创建instance所需的参数
        return {
            "statusCode": this.status,
            "result": allAssertResult,
            "time": this.time,
            "size": "",
            "requestInstance": {
                "url": this.baseInfo,
                "methodType": this.methodType,
                "headers": this.requestHeaderCaseData,
                "mediaType":requestHeaders["content-type"],
                "body": this.requestBodyCaseData,
                "preScript": null,
                "afterScript": null
            },
            'responseInstance': {
                'headers': this.responseHeaderCaseData,
                'body': this.responseBodyCaseData
            },
            'assertInstanceList': assertData
        }
    }

    @action
    getResponseError= async (res) =>{
        this.time=null;
        this.status=null;

        this.error ={
            errorMessage:res.error,
            showError:true
        }

        return {
            "result":-1,
            "errorMessage":res.error,
            "requestInstance":{
                "url":this.baseInfo,
                "methodType":this.methodType,
                "headers":this.requestHeaderCaseData,
                "mediaType":JSON.parse(this.requestHeaderCaseData)["content-type"],
                "body":this.requestBodyCaseData,
                "preScript":null,
                "afterScript":null
            }
        }
    }



    @action
    getTime = (time) =>{
        this.time = time;
    }


}

export const TESTCASESTORE = 'testCaseStore';
