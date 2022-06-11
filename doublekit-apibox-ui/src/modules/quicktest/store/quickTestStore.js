import { observable, action } from "mobx";
import {AssertCommonStore} from "../../apitest/common/assertCommonStore";
import qs from "qs";

let assertCommonStore = new AssertCommonStore();

export  class QuickTestStore {
    @observable status = '';
    @observable time = '';
    @observable assertResponse = [];
    @observable baseInfo;
    @observable baseData;
    @observable responseBodyData;
    @observable responseHeaderData;
    @observable requestBodyData;
    @observable requestHeaderData;
    @observable methodType;
    @observable isResponseShow="false";

    @action
    getRequestInfo = (data) => {
        // this.baseData = {
        //     "method":data.method,
        //     "baseUrl":data.baseUrl,
        //     "path":data.url
        // }
        //
        // this.requestBodyData = data.bodys;
        // this.requestHeaderData = JSON.stringify(data.headers);
        this.methodType = data.method;

        if(data.params&&Object.keys(data.params).length>0){
            if(data.baseUrl){
                this.baseInfo = data.baseUrl+data.url+'?'+qs.stringify(data.params)
            }else {
                this.baseInfo =data.url+'?'+qs.stringify(data.params)
            }
        }else {
            if(data.baseUrl){
                this.baseInfo = data.baseUrl+data.url
            }else {
                this.baseInfo =data.url
            }
        }

        this.requestHeaderData = JSON.stringify(data.headers);
        this.requestBodyData = data.bodys;
    }

    @action
    getResponseInfo = async (res,assertData) => {
        this.status = res.status;
        const headers = res.headers;
        const body = res.data;

        //断言处理
        let assertList = this.assertListProcess(assertData);

        const assertNeedData ={
            "status":res.status,
            "header":headers,
            "body":body,
            "assertList":assertList
        }

        //断言list，添加result 字段。用于测试结果中的断言回显
        let allAssertResult=assertCommonStore.assertCompare(assertNeedData);

        this.responseHeaderData = JSON.stringify(headers);
        this.responseBodyData = body;
        this.assertResponse = assertList;

        //创建instance所需的参数
        let allValueInfo = {
            'statusCode':this.status,
            'result':allAssertResult,
            "time": this.time,
            "size":"",
            'requestInstance':{
                "url":this.baseInfo,
                "methodType":this.methodType,
                "mediaType":"application/json",
                'headers':this.requestHeaderData,
                'body':this.requestBodyData,
                "preScript":null,
                "afterScript":null
            },
            'responseInstance':{
                'headers':headers?JSON.stringify(headers):"",
                'body':body?JSON.stringify(body):""
            },
            'assertInstanceList':assertData
        }

        return allValueInfo
    }


    //断言list处理
    @action
    assertListProcess=(data)=>{
        return data && data.filter((item) => {
            let itemKeys = Object.keys(item);
            return !(itemKeys.length === 1 && itemKeys[0] === "id")
        });
    }

    @action
    getTime = (value) => {
        this.time= value;
    }

    @action
    getInstance = (res,resInstance) =>{
        this.time = res.time;
        this.status = res.statusCode;

        this.responseBodyData = resInstance.body;
        this.responseHeaderData = resInstance.headers;

        this.requestBodyData = res.requestInstance?.body;
        this.requestHeaderData = res.requestInstance?.headers;
    }

    @action
    setResponseShow = () =>{
        this.isResponseShow = true
    }


}

export const QUICKTEST_STORE = 'quickTestStore';