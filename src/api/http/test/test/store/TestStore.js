import {action, observable} from 'mobx';
import {AssertCommonStore} from "../../common/AssertCommonStore";

let assertCommonStore = new AssertCommonStore();

class TestStore {
    @observable proxyItem;

    @observable status = '';
    @observable time = '';
    @observable size;
    @observable assertResponse = [];

    @observable responseBodyData;
    @observable responseHeaderData;
    @observable requestBodyData;
    @observable requestHeaderData;

    //定义中的jsonSchema
    @observable jsonSchema
    //处理后的json
    @observable jsonData


    @action
    getRequestInfo = (data) => {

        // this.requestBodyData = data.bodys;
        //
        // this.requestHeaderData = JSON.stringify(data.headers);
    }

    @action
    getResponseInfo = (data,assertData) => {
        let res = data.res;

        //时间
        this.time=data.time;
        //状态码
        this.status = res.status;

        let requestHeaders= res?.config?.headers;
        let requestBody =  res?.config?.data;

        const headers = res.headers;
        const body = JSON.stringify(res.data);
        //大小
        this.size = body.length;

        //断言处理
        let assertList = this.assertListProcess(assertData);

        const assertNeedData ={
            "status":res.status,
            "header":headers,
            "body":body,
            "assertList":assertList
        }

        //断言list，添加result 字段。用于测试结果中的断言回显
        assertCommonStore.assertCompare(assertNeedData);


        this.requestBodyData = requestBody;
        this.requestHeaderData = JSON.stringify(requestHeaders);
        this.responseHeaderData = JSON.stringify(headers);
        this.responseBodyData = body;
        this.assertResponse = assertList;
    }


    //断言list处理
    @action
    assertListProcess=(data)=>{
        return data && data.filter((item) => {
            let itemKeys = Object.keys(item);
            return !(itemKeys.length === 1 && itemKeys[0] === "id")
        });
    }


    /**
     * 获取定义中的jsonschema
     */
    @action
    getJsonParam = (jsonSchema) =>{
        this.jsonSchema =jsonSchema
    }

    /**
     * 获取处理好的json数据
     */
    @action
    getJsonData = (value) =>{
        this.jsonData = value
    }


}

let testStore = new TestStore();
export default testStore;
