import {action, observable} from "mobx";
import {AssertCommonStore} from "../../api/http/test/common/AssertCommonStore";
import qs from "qs";

let assertCommonStore = new AssertCommonStore();

/**
 * 快捷测试 store
 */
export  class QuickTestStore {
    @observable status = '';
    @observable time = '';
    @observable assertResponse = [];
    @observable baseInfo;
    @observable error;
    @observable responseBodyData;
    @observable responseHeaderData;
    @observable requestBodyData;
    @observable requestHeaderData;
    @observable methodType;
    @observable isResponseShow="false";

    /**
     * 获取请求参数
     */
    @action
    getRequestInfo = (data) => {
        this.methodType = data.method;

        if(data.params&&Object.keys(data.params).length>0){
            this.baseInfo = data.path+'?'+qs.stringify(data.params)
        }else {
            this.baseInfo = data.path
        }

        // this.requestHeaderData = JSON.stringify(data.headers);
        // this.requestBodyData = data.bodys;
    }

    /**
     * 获取响应参数
     */
    @action
    getResponseInfo = async (data,assertData) => {
        let res = data.res;

        this.time=data.time;
        this.status = res.status;
        debugger
        let requestHeaders= res?.config?.headers;
        let requestBody =  res?.config?.data;

        const headers = res.headers;
        const body =res.data;

        //大小
        this.size = JSON.stringify(body).length;

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

        this.requestBodyData= requestBody
        this.requestHeaderData=JSON.stringify(requestHeaders);
        this.responseHeaderData = JSON.stringify(headers);
        this.responseBodyData = JSON.stringify(body);
        this.assertResponse = assertList;

        //创建instance所需的参数
        return {
            'statusCode': this.status,
            'result': allAssertResult,
            "time": this.time,
            "size": this.size,
            'requestInstance': {
                "url": this.baseInfo,
                "methodType": this.methodType,
                "mediaType": requestHeaders["content-type"],
                'headers': this.requestHeaderData,
                'body': this.requestBodyData,
                "preScript": null,
                "afterScript": null
            },
            'responseInstance': {
                'headers': headers ? JSON.stringify(headers) : "",
                'body': body ? JSON.stringify(body) : ""
            },
            'assertInstanceList': assertData
        }
    }

    /**
     * 获取响应错误参数
     */
    @action
    getResponseError= async (res)=>{
        this.time=null;
        this.status=null;

        this.error ={
            errorMessage:res.error,
            showError:false
        }

        return {
            "result":-1,
            "errorMessage":res.error,
            "requestInstance":{
                "url":this.baseInfo,
                "methodType":this.methodType,
                "headers":this.requestHeaderData,
                "mediaType":JSON.parse(this.requestHeaderData)["content-type"],
                "body":this.requestBodyData,
                "preScript":null,
                "afterScript":null
            }
        }
    }


    /**
     * 断言list处理
     */
    @action
    assertListProcess=(data)=>{
        return data && data.filter((item) => {
            let itemKeys = Object.keys(item);
            return !(itemKeys.length === 1 && itemKeys[0] === "id")
        });
    }

    /**
     * 获取时间
     */
    @action
    getTime = (value) => {
        this.time= value;
    }

    /**
     * 获取实例
     */
    @action
    getInstance = (res) =>{
        this.time = res.time;
        this.status = res.statusCode;

        if(!res.errorMessage){
            this.responseBodyData = res.responseInstance?.body;
            this.responseHeaderData = res.responseInstance?.headers;
        }

        this.requestBodyData = res.requestInstance?.body;
        this.requestHeaderData = res.requestInstance?.headers;
    }

    /**
     * 响应 界面切换
     */
    @action
    setResponseShow = () =>{
        this.isResponseShow = true
    }


}

export const QUICKTEST_STORE = 'quickTestStore';