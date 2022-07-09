import axios from "axios";
import {testFunctionCommon} from "../../apitest/common/testFunctionCommon";
import qs from "qs";
import {
    bodyTypeJsonDictionary as bodyTypeJson,
    rawTypeJsonDictionary as rawTypeJson
} from "../dictionary/dictionary";

//发送测试 数据处理
export const sendTestDataProcess=(data)=>{

    //header
    let headers = testFunctionCommon.headerData(data.headerList);

    //query
    let params = testFunctionCommon.transData(data.queryList);

    //body
    let bodys = bodySwitch(data,headers)

    //请求参数
    return {
        "method": data.method,
        "url": data.baseUrl ? data.baseUrl + data.path : data.path,
        "headers": headers,
        "params": params,
        "bodys": bodys,
    };

}


//发送测试
export const sendTest=async (data)=>{

    // 请求前的毫秒数
    let sendDate = (new Date()).getTime();

    // 请求
    let res = await axios({
        method: data.method,
        url: data.url,
        data: data.bodys,
        params: data.params,
        headers: data.headers,
    }).then(res=>{

        let receiveDate = (new Date()).getTime();
        //time, ms
        let responseTimeMs = receiveDate - sendDate;

        return {
            time:responseTimeMs,
            res:res
        }
    }).catch(error=>{
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            let receiveDate = (new Date()).getTime();
            let responseTimeMs = receiveDate - sendDate;

            return  {
                time:responseTimeMs,
                res:error.response
            }
        } else {
            // network Error
            console.log('Error', error.message);

            return {error:error.message}
        }
    })

    return res
}



//获取相应的请求体数据
const bodySwitch = (data,headers) =>{
    switch (data.bodyType) {
        case bodyTypeJson.none:
            return null;
        case bodyTypeJson.formdata:
            return formData(data.formDataList,headers);
        case bodyTypeJson.formUrlencoded:
            return formUrlencoded(data.formUrlencodedList,headers)
        case bodyTypeJson.json:
            return json(data.jsonList,headers)
        case bodyTypeJson.raw:
            return rawSwitch(data.rawParam,headers)
        // case "binary":

    }
}

//获取formdata数据
const formData = (data,headers)=>{
    headers['content-type']='multipart/form-data';
    return testFunctionCommon.formData(data)
}

//获取formUrlencoded数据
const formUrlencoded = (data,headers) =>{
    headers['content-type']='application/x-www-form-urlencoded';
    let formUrlencoded =testFunctionCommon.transData(data);

    return qs.stringify(formUrlencoded);
}

//获取json数据
const json = (data,headers) =>{
    headers['content-type']='application/json';
    return testFunctionCommon.jsonData(data)
}

//获取相应的raw数据
const rawSwitch = (data,headers) =>{
    switch (data&&data.type){
        case rawTypeJson.text:
            headers['content-type']='text/plain';
            return data.raw;
        case rawTypeJson.json:
            headers['content-type']='application/json';
            return data.raw;
        case rawTypeJson.javascript:
            headers['content-type']='application/javascript';
            return data.raw;
        case rawTypeJson.xml:
            headers['content-type']='text/xml';
            return data.raw;
        case rawTypeJson.html:
            headers['content-type']='text/html';
            return data.raw;
    }
}


