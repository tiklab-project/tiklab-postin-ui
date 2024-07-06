import {testFunctionCommon} from "../../api/common/TestFunctionCommon";
import {mediaTypeDir, rawTypeDictionary} from "../dictionary/dictionary";
import axiosIns from "../utils/localrequest";
import {getUser} from "thoughtware-core-ui";
import React from "react";
import querystring from "querystring";

//处理本地数据
export const localDataProcess = ({
         methodType,
         url,
         headerList,
         queryList,
         bodyType,
         formDataList,
         formUrlList,
         json,
         raw,
         assertList
})=>{

    let header = {}
    if(headerList&&headerList.length>0){
        header = testFunctionCommon.headerData(headerList);
    }

    let query
    if(queryList&&queryList.length>0){
        query = testFunctionCommon.transData(queryList)
    }

    let body;
    let mediaType;
    switch (bodyType){
        case mediaTypeDir.none.title:
            body = null;

            break;
        case mediaTypeDir.formdata.title:
            body = testFunctionCommon.transData(formDataList)
            mediaType = mediaTypeDir.formdata.mediaType;
            header['content-type']=mediaTypeDir.formdata.mediaType;
            break;
        case mediaTypeDir.formUrlencoded.title:
            body = testFunctionCommon.transData(formUrlList)
            mediaType = mediaTypeDir.formdata.mediaType;
            header['content-type']=mediaTypeDir.formUrlencoded.mediaType;
            break;
        case mediaTypeDir.json.title:
            body = json
            mediaType = mediaTypeDir.json.mediaType;
            header['content-type']=mediaTypeDir.json.mediaType;
            break;
        case mediaTypeDir.raw.title:
            body = raw.raw
            switch (raw.type){
                case rawTypeDictionary.text.mediaType:
                    mediaType = rawTypeDictionary.text.mediaType;
                    header['content-type']=rawTypeDictionary.text.mediaType;
                    break;

                case rawTypeDictionary.json.mediaType:
                    mediaType = rawTypeDictionary.json.mediaType;
                    header['content-type']= rawTypeDictionary.json.mediaType;
                    break;

                case rawTypeDictionary.javascript.mediaType:
                    mediaType = rawTypeDictionary.javascript.mediaType;
                    header['content-type']= rawTypeDictionary.javascript.mediaType;
                    break;

                case rawTypeDictionary.xml.mediaType:
                    mediaType = rawTypeDictionary.xml.mediaType;
                    header['content-type']=rawTypeDictionary.xml.mediaType;
                    break;

                case rawTypeDictionary.html.mediaType:
                    mediaType = rawTypeDictionary.html.mediaType;
                    header['content-type']=rawTypeDictionary.html.mediaType;
                    break;
            }
            break;
        default:
            break;
    }

    let assert
    if(assertList&&assertList.length>0){
        assert = testFunctionCommon.transData(assertList)
    }

    return {
        methodType:methodType,
        url:url,
        header:header,
        query:query,
        bodyType:bodyType,
        mediaType:mediaType,
        body:body,
        asserts:assert
    }
}


/**
 * 合并数据
 */
export const mergeTestData=(localData,preScriptInfo,globalParam)=>{
    let {methodType,url,header,query={},body,mediaType} = localData

    //header
    if(preScriptInfo&&preScriptInfo.header){
        header=Object.assign({},header,preScriptInfo.header)
    }

    let globalHeader;
    if(globalParam){
        globalHeader = testFunctionCommon.headerData(globalParam.header);
    }

    if(globalHeader){
        header=Object.assign({},header,globalHeader)
    }

    //query
    if(preScriptInfo&&preScriptInfo.query){
        query=Object.assign({},query,preScriptInfo.query)
    }

    //请求参数
    return {
        "methodType": methodType,
        "url": localData.baseUrl ? localData.baseUrl + url : url,
        "header": header,
        "query": query,
        "mediaType": mediaType,
        "body": body,
    };
}


/**
 * request接口代理发送测试
 * Proxy send test
 */
export const localProxySendTest=async (data)=>{
    const {body,headers=data.header,method=data.methodType,url} = data;

    //当前执行的请求的接口参数
    let queryHeader=Object.assign({}, {"User-Agent":"PostIn/1.0.0"}, {...headers})

    //request接口的请求头
    let axiosHeaders = {};
    //ce版本不需要tenant租户
    if(version==="cloud"){
        axiosHeaders=Object.assign({},axiosHeaders,{"tenant":getUser().tenant})

        //mockx saas版需要添加租户
        if(url.includes("mockx")){
            queryHeader=Object.assign({},queryHeader,{"tenant":getUser().tenant})
        }
    }

    if(method!=="get"){
        axiosHeaders=Object.assign({},axiosHeaders,{"content-type": headers["content-type"]})
    }else {
        axiosHeaders=Object.assign({},axiosHeaders,{"User-Agent":"PostIn/1.0.0"})
    }

    // request接口中pi-header
    let axiosQuery =processPiHeader(queryHeader,data)

    //request接口 请求地址
    let fetchUrl

    if (IS_DEV) {
        fetchUrl = `/request?${axiosQuery}`;
    } else {
        const baseUrl = window.location.origin;
        fetchUrl = `${baseUrl}/request?${axiosQuery}`;
    }

    //处理body
    let bodys = processBody(body,headers["content-type"])

    // 通过/request接口请求
    let res =  axiosIns.post(
        fetchUrl,
        bodys,
        { headers:axiosHeaders}
    ).then(res=>{
        return processResponse(res)
    }).catch(error=>{
        console.log(error.message)
    })

    return res
}

/**
 * 处理body
 */
const processBody = (body,method) =>{
    switch (method) {
        case mediaTypeDir.none.mediaType:
            break
        case mediaTypeDir.formdata.mediaType:
            let formData = testFunctionCommon.formData(body);
            return formData;
        case mediaTypeDir.formUrlencoded.mediaType:
            let data =querystring.stringify(body)
            return data;

        default:
            if(body){
                return body
            }
    }
}




/**
 * 处理响应数据
 */
const processResponse = (res) =>{
    let responseData ={}

    if(Object.keys(res.headers).length>0){

        //判断是否有错误
        const ERROR_MESSAGES = {
            TIMEOUT: "Error : Read timed out.  请求超时!",
            CONNECTION_REFUSED: "请求错误：Couldn't resolve host。请检查接口域名是否能够正常解析",
            UNKNOWN: "请求错误：Couldn't resolve host。请检查接口域名是否能够正常解析"
        };

        if (res.headers["pi-error"]) {
            const errorMsg = res.headers["pi-error"];

            if (errorMsg) {
                let errorMessage = ERROR_MESSAGES.UNKNOWN;

                if (errorMsg.includes("timed out")) {
                    errorMessage = ERROR_MESSAGES.TIMEOUT;
                } else if (errorMsg.includes("Connection refused")) {
                    errorMessage = ERROR_MESSAGES.CONNECTION_REFUSED;
                }

                return {
                    result: -1,
                    errorMessage: errorMessage
                };
            }
        }

        //解析 基础信息 statusCode,statusText,times
        let base = res.headers["pi-base"]

        if(base) {
            let baseInfo = base.split(",").reduce((acc, cur) => {
                const [key, value] = cur.split("=");
                acc[key] = isNaN(value) ? value : Number(value);
                return acc;
            }, {});

            responseData = Object.assign({},{
                time:baseInfo.time,
                statusCode:baseInfo.statusCode,
                size:baseInfo.size,
            })
        }

        //解析 响应头
        let headerStr = res.headers["pi-header"]

        let headerObj;
        if(headerStr){
            //解析后的响应头
            headerObj = parseResponseHeaders(headerStr);

            responseData = Object.assign({},responseData,{headers:headerObj})
        }

        responseData = Object.assign({},responseData,{body:res.data})

        return responseData;
    }else {

        responseData = Object.assign({},{
            error:res.error
        })

        return responseData
    }

}

/**
 * 把当前请求的接口基础信息放到query参数里请求，转换成query字符参数?a=b&c=d
 */
const processPiHeader = (queryHeader,data) =>{
    let {query,url,methodType} = data

    // pi-url
    const newQueryString = mergeQueryParams(url, query);
    const newUrl = url.split('?')[0] + (newQueryString ? `?${newQueryString}` : '');

    // pi-header
    let queryHeaderStr = Object.entries(queryHeader).map(([key, value]) => `${key}:${value}`).join(",");

    let queryHeaderObj=  {"pi-header":queryHeaderStr,"pi-url":newUrl,"pi-method":methodType}

    return Object.keys(queryHeaderObj).map(key => key + '=' + queryHeaderObj[key]).join('&');
}

/**
 * 合并url？后参数与query中的参数
 * @param url
 * @param query
 * @returns {string|*}
 */
function mergeQueryParams(url, query) {
    const params = new URLSearchParams(new URL(url).search);
    const paramsObj = {};
    for (const [key, value] of params) {
        paramsObj[key] = value;
    }
    const allQuery = { ...paramsObj, ...query };
    return buildQueryString(allQuery);
}

/**
 * 生成地址后面的参数
 */
function buildQueryString(query) {
    if (!query) return '';

    return Object.entries(query)
        .map(([key, value]) => {
            // 如果参数值已经被编码过了，则不再进行二次编码
            const encodedValue = encodeURIComponent(value);
            const encodedValueCheck = encodeURIComponent(decodeURIComponent(value));
            const finalValue = encodedValue === encodedValueCheck ? encodedValue : value;

            return `${encodeURIComponent(key)}=${finalValue}`;
        })
        .join('&');
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



