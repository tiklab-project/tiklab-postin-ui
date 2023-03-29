import {testFunctionCommon} from "../../api/http/test/common/TestFunctionCommon";
import qs from "qs";
import {bodyTypeJsonDictionary as bodyTypeJson, rawTypeJsonDictionary as rawTypeJson} from "../dictionary/dictionary";
import {getHeader, getQuery} from "../../api/http/test/common/dtAction";
import axiosIns from "../utils/localrequest";
import {messageFn} from "../messageCommon/MessageCommon";


/**
 * 发送测试之前数据处理
 */
export const sendTestDataProcess=(data,preParamTestInfo)=>{

    //header
    let header = testFunctionCommon.headerData(data.headerList);

    //前置：获取header进行操作
    getHeader(header);

    // let headers =  darth.header.set("accept","123")


    //query
    let params = testFunctionCommon.transData(data.queryList);

    //前置：获取header进行操作
    getQuery(params);

    //body
    let bodys = bodySwitch(data,header)

    //前置
    // if(preParamTestInfo){
    //     execute(preParamTestInfo?.scriptex)
    // }

    //请求参数
    return {
        "method": data.method,
        "url": data.baseUrl ? data.baseUrl + data.path : data.path,
        "headers": header,
        "params": params,
        "bodys": bodys,
    };

}



/**
 * request接口代理发送测试
 * Proxy send test
 */
export const localProxySendTest=async (proxyPath,data)=>{
    const {bodys,headers} = data;

    //当前执行的请求的接口参数
    let queryHeader=Object.assign({}, {"User-Agent":"PostIn/1.0.0"}, {...headers})

    //request接口 请求头
    let axiosHeaders
    if(data.method!=="get"){
        axiosHeaders={"content-type": headers["Content-Type"]}
    }else {
        axiosHeaders={"User-Agent":"PostIn/1.0.0"}
    }

    //处理后的查询参数
    let axiosQuery =processPiHeader(queryHeader,data)

    //request接口 请求地址
    let fetchUrl

    if (!!IS_DEV) {
        fetchUrl = `/request?${axiosQuery}`;
    } else {
        const baseUrl = base_url ?? window.location.origin;
        fetchUrl = `${baseUrl}/request?${axiosQuery}`;
    }

    //请求
   let res =  axiosIns.post(fetchUrl,bodys,{ headers:axiosHeaders}).then(res=>{

       return processResponse(res)

    }).catch(error=>{
        console.log(error.message)
    })

    return res
}

/**
 * 处理响应数据
 */
const processResponse = (res) =>{
    let resDate={};

    if(Object.keys(res.headers).length>0){

        //解析 基础信息 statusCode,statusText,times
        let base = res.headers["pi-base"]
        let baseInfo;
        if(base) {
             baseInfo = base.split(",").reduce((acc, cur) => {
                const [key, value] = cur.split("=");
                acc[key] = isNaN(value) ? value : Number(value);
                return acc;
            }, {});

            resDate.time=baseInfo.time;
            res.status=baseInfo["statusCode"]
        }

        //获取响应头
        let headerStr = res.headers["pi-header"]

        let headerObj;
        if(headerStr){
            //解析后的响应头
            headerObj = parseResponseHeaders(headerStr);

            res.headers=headerObj
        }


    }

    resDate.res=res

    return resDate
}

/**
 * 把当前请求的接口基础信息放到query参数里请求，转换成query字符参数?a=b&c=d
 */
const processPiHeader = (queryHeader,data) =>{
    //头部
    let queryHeaderStr = Object.entries(queryHeader).map(([key, value]) => `${key}:${value}`).join(",");

    let queryHeaderObj=  {"pi-header":queryHeaderStr,"pi-url":data.url,"pi-method":data.method}

    return Object.keys(queryHeaderObj).map(key => key + '=' + queryHeaderObj[key]).join('&');
}

/**
 * 解析响应头里的pi-header
 * 这是当前发送测试接口的响应头
 */
const  parseResponseHeaders = (headersText) => {
    //正则 解析如：”Bdpagetype:[1],Bdqid:[0x91b9b91c0001489e],Connection:[keep-alive]“的响应头字符串
    const headers = {};

    const pattern = /([^,]+):\[(.*?)\]/g;

    let match;
    while ((match = pattern.exec(headersText)) !== null) {
        headers[match[1]] = match[2];
    }
    return headers;
}


/**
 * 获取相应的请求体数据
 */
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

/**
 * 获取formdata数据
 */
const formData = (data,headers)=>{
    headers['Content-Type']='multipart/form-data';
    return testFunctionCommon.formData(data)
}

/**
 * 获取formUrlencoded数据
 */
const formUrlencoded = (data,headers) =>{
    headers['Content-Type']='application/x-www-form-urlencoded';
    let formUrlencoded =testFunctionCommon.transData(data);

    return qs.stringify(formUrlencoded);
}

/**
 * 获取json数据
 */
const json = (data,headers) =>{
    headers['Content-Type']='application/json';
    return testFunctionCommon.jsonData(data)
}

/**
 * 获取相应的raw数据
 */
const rawSwitch = (data,headers) =>{
    switch (data&&data.type){
        case rawTypeJson.text:
            headers['Content-Type']='text/plain';
            return data.raw;
        case rawTypeJson.json:
            headers['Content-Type']='application/json';
            return data.raw;
        case rawTypeJson.javascript:
            headers['Content-Type']='application/javascript';
            return data.raw;
        case rawTypeJson.xml:
            headers['Content-Type']='text/xml';
            return data.raw;
        case rawTypeJson.html:
            headers['Content-Type']='text/html';
            return data.raw;
    }
}



/**
 * 本地
 * 发送测试
 */
// export const sendTest=async (data)=>{
//
//     // 请求前的毫秒数
//     let sendDate = (new Date()).getTime();
//
//     let res = await axiosIns({
//         method: data.method,
//         url: data.url,
//         data: data.bodys,
//         params: data.params,
//         headers: data.headers,
//     }).then(res=>{
//
//         let receiveDate = (new Date()).getTime();
//         //time, ms
//         let responseTimeMs = receiveDate - sendDate;
//
//         console.log(res)
//         return {
//             time:responseTimeMs,
//             res:res
//         }
//     }).catch(error=>{
//         if (error.response) {
//             // 请求已发出，但服务器响应的状态码不在 2xx 范围内
//             let receiveDate = (new Date()).getTime();
//             let responseTimeMs = receiveDate - sendDate;
//
//             return  {
//                 time:responseTimeMs,
//                 res:error.response
//             }
//         } else {
//             // network Error
//             console.log('Error', error.message);
//
//             return {error:error.message}
//         }
//     })
//
//     return res
// }



