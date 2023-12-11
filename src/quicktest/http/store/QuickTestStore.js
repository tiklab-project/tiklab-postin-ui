import {action, observable} from "mobx";
import {AssertCommonStore} from "../../../api/http/test/common/AssertCommonStore";
import qs from "qs";
import {Axios} from "thoughtware-core-ui";

let assertCommonStore = new AssertCommonStore();

/**
 * 快捷测试 store
 */
class QuickTestStore {
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
    @observable responseData;


    /**
     * 获取请求参数
     */
    @action
    getRequestInfo = (data) => {
        const {methodType,query,header,url,body} = data;
        this.methodType = methodType;

        if(query&&Object.keys(query).length>0){
            this.baseInfo = url+'?'+qs.stringify(query)
        }else {
            this.baseInfo =url
        }

        this.requestHeaderData = JSON.stringify(header);
        this.requestBodyData = body;
    }

    /**
     * 获取响应参数
     */
    @action
    getResponseInfo = async (data,assertData,localData) => {
        if(data){
            const {time,statusCode,headers,size,body} = data;


            //断言处理
            let assertList = this.assertListProcess(assertData);

            const assertNeedData ={
                "status":statusCode,
                "header":headers,
                "body":body,
                "assertList":assertList
            }

            //断言list，添加result 字段。用于测试结果中的断言回显
            let allAssertResult=assertCommonStore.assertCompare(assertNeedData);


            this.responseHeaderData = JSON.stringify(headers);
            this.responseBodyData = JSON.stringify(body);
            this.assertResponse = assertList;

            //创建instance所需的参数
            return {
                'statusCode': statusCode,
                'result': allAssertResult,
                "time": time,
                "size": size,
                'responseInstance': {
                    'headers': headers ? JSON.stringify(headers) : "",
                    'body': body ? JSON.stringify(body) : ""
                },
                'assertInstanceList': assertData
            }
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
        if(res){
            const {statusCode,time} = res;

            this.time = time;
            this.status = statusCode;

            if(!res.errorMessage){
                this.responseBodyData = res.responseInstance?.body;
                this.responseHeaderData = res.responseInstance?.headers;
            }

            this.requestBodyData = res.requestInstance?.body;
            this.requestHeaderData = res.requestInstance?.headers;
        }

    }

    /**
     * 保存为接口
     */
    @action
    saveToApi = async (data) => await Axios.post("/quick/saveToApi",data);


    /**
     * 响应 界面切换
     */
    @action
    setResponseShow = (value) =>{
        this.isResponseShow = value
    }

    @action
    setResponseData = (data) =>{
        this.responseData = data;
    }

}

let quickTestStore = new QuickTestStore();
export default quickTestStore;