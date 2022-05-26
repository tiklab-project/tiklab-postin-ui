import { observable, action } from "mobx";
import {AssertCommonStore} from "../../apitest/common/assertCommonStore";
import qs from "qs";

let assertCommonStore = new AssertCommonStore();

export  class QuickTestStore {
    @observable status = '';
    @observable time = '';
    @observable assertResponse = [];

    @observable baseData;
    @observable responseBodyData;
    @observable responseHeaderData;
    @observable requestBodyData;
    @observable requestHeaderData;
    @observable requestType;

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
        this.requestType = data.method;

        if(data.params&&Object.keys(data.params).length>0){
            this.baseInfo = data.baseUrl+data.url+'?'+qs.stringify(data.params)
        }else {
            this.baseInfo = data.baseUrl+data.url
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
            "requestType":this.requestType,
            'requestInstance':{
                'requestBase':this.baseInfo,
                'requestHeader':this.requestHeaderData,
                'requestParam':this.requestBodyData
            },
            'responseInstance':{
                'responseHeader':JSON.stringify(headers),
                'responseBody':JSON.stringify(body)
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
}

export const QUICKTEST_STORE = 'quickTestStore';