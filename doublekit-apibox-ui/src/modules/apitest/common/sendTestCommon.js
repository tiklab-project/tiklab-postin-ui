import axios from "axios";
import {testFunctionCommon} from "./testFunctionCommon";
import qs from "qs";

//发送测试 数据处理
export const sendTestDataProcess=(data)=>{

    let headers = testFunctionCommon.headerData(data.headerList);

    let params = testFunctionCommon.transData(data.queryList);

    let bodys = bodySwitch(data,headers)

    const requestInfo = {
        "method":data.method,
        "baseUrl":data.baseUrl,
        "url":data.path,
        "headers":headers,
        "params":params,
        "bodys":bodys,
    }

    //用于store获取数据
    data.getRequestInfo(requestInfo)

    const sendData = {
        ...requestInfo,
        "assertList":data.assertList,
        "getTime":data.getTime,
        "getResponseInfo":data.getResponseInfo,
        "testType":data.testType,
        "createInstance":data.createInstance,
        "belongId":data.belongId,
    }

    //发送测试
    sendTest(sendData);
}


//发送测试
const sendTest=(data)=>{

    // 请求前的毫秒数
    let sendDate = (new Date()).getTime();

    // 请求
    axios({
        method: data.method,
        baseURL: data.baseUrl,
        url: data.url,
        data: data.bodys,
        params: data.params,
        headers: data.headers,
        timeout: 10000,
    }).then((res)=>{
        // 请求后的毫秒数
        let receiveDate = (new Date()).getTime();
        let responseTimeMs = receiveDate - sendDate;

        data.getTime(responseTimeMs);

        isCreateInstance(res,data)
    }).catch((error) => {
        isCreateInstance(error.response,data)
    });
}

//如果是测试用例的页的测试，需要创建instance
const isCreateInstance=(res,data)=>{
    if(data.createInstance){
        data.getResponseInfo(res,data.assertList).then(res=>{
            res.testcase = {"id":data.belongId}
            data.createInstance(res)
        })
    }else {
        data.getResponseInfo(res,data.assertList)
    }
}

//获取相应的请求体数据
const bodySwitch = (data,headers) =>{
    switch (data.bodyType) {
        case "formdata":
            return formData(data.formDataList,headers);
        case "formUrlencoded":
            return formUrlencoded(data.formUrlencodedList,headers)
        case "json":
            return json(data.jsonList,headers)
        case "raw":
            return rawSwitch(data.rawParam,headers)
        case "binary":

    }
}

//获取formdata数据
const formData = (data,headers)=>{
    headers['Content-Type']='multipart/form-data';
    let formdata = testFunctionCommon.formData(data);

    return formdata
}

//获取formUrlencoded数据
const formUrlencoded = (data,headers) =>{
    headers['Content-Type']='application/x-www-form-urlencoded';
    let formUrlencoded =testFunctionCommon.transData(data);

    return qs.stringify(formUrlencoded);
}

//获取json数据
const json = (data,headers) =>{
    headers['Content-Type']='application/json';
    let jsonResult =  testFunctionCommon.jsonData(data);

    return jsonResult
}

//获取相应的raw数据
const rawSwitch = (data,headers) =>{
    switch (data&&data.type){
        case "json":
            headers['Content-Type']='application/json';
            return data.raw;
        case "raw":
            headers['Content-Type']='text/plain';
            return data.raw;
        // case "application/javascript":
        //     headers['Content-Type']='application/javascript';
        //     return data.raw;
        // case "application/xml":
        //     headers['Content-Type']='application/xml';
        //     return data.raw;
        // case "text/xml":
        //     headers['Content-Type']='text/xml';
        //     return data.raw;
        // case "text/html":
        //     headers['Content-Type']='text/html';
        //     return data.raw;
        // case "text/plain":
        //     headers['Content-Type']='text/plain';
        //     return data.raw
    }
}


