import {testFunctionCommon} from "../../api/http/test/common/TestFunctionCommon";
import {mediaTypeDir, rawTypeDictionary} from "../dictionary/dictionary";
import axiosIns from "../utils/localrequest";
import {getUser} from "tiklab-core-ui";
import React from "react";

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
            break;
        case mediaTypeDir.formUrlencoded.title:
            body = testFunctionCommon.transData(formUrlList)
            mediaType = mediaTypeDir.formdata.mediaType;
            break;
        case mediaTypeDir.json.title:
            body = json
            mediaType = mediaTypeDir.json.mediaType;
            break;
        case mediaTypeDir.raw.title:
            body = raw
            switch (raw.type){
                case rawTypeDictionary.text.mediaType:
                    mediaType = rawTypeDictionary.text.mediaType;
                    break;

                case rawTypeDictionary.json.mediaType:
                    mediaType = rawTypeDictionary.json.mediaType;
                    break;

                case rawTypeDictionary.javascript.mediaType:
                    mediaType = rawTypeDictionary.javascript.mediaType;
                    break;

                case rawTypeDictionary.xml.mediaType:
                    mediaType = rawTypeDictionary.xml.mediaType;
                    break;

                case rawTypeDictionary.html.mediaType:
                    mediaType = rawTypeDictionary.html.mediaType;
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
        assert:assert
    }
}


/**
 * 合并数据
 */
export const mergeTestData=(localData,preScriptInfo,globalParam)=>{
    let {methodType,url,header,query={},bodyType,mediaType} = localData

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

    //设置请求类型
     let processBody = setContentType(localData,header)

    //请求参数
    return {
        "methodType": methodType,
        "url": localData.baseUrl ? localData.baseUrl + url : url,
        "header": header,
        "query": query,
        "mediaType": mediaType,
        "body": processBody,
    };
}

/**
 * 获取相应的请求体数据
 */
const setContentType = (localData,headers) =>{
    let {bodyType,body} = localData;
    switch (bodyType) {
        case mediaTypeDir.none.title:
            headers['content-type']="application/json";
            break
        case mediaTypeDir.formdata.title:
            headers['content-type']=mediaTypeDir.formdata.mediaType;
            //formData 数据特殊处理
            let formData = testFunctionCommon.formData(body);
            return formData;
        case mediaTypeDir.formUrlencoded.title:
            headers['content-type']=mediaTypeDir.formUrlencoded.mediaType;
            return body;
        case mediaTypeDir.json.title:
            headers['content-type']=mediaTypeDir.json.mediaType;
            return
        case mediaTypeDir.raw.title:
            switch (body.type){
                case rawTypeDictionary.text.mediaType:
                    headers['content-type']=rawTypeDictionary.text.mediaType;
                    return body.raw;

                case rawTypeDictionary.json.mediaType:
                    headers['content-type']=rawTypeDictionary.json.mediaType;
                    return body.raw;

                case rawTypeDictionary.javascript.mediaType:
                    headers['content-type']=rawTypeDictionary.javascript.mediaType;
                    return body.raw;

                case rawTypeDictionary.xml.mediaType:
                    headers['content-type']=rawTypeDictionary.xml.mediaType;
                    return body.raw;

                case rawTypeDictionary.html.mediaType:
                    headers['content-type']=rawTypeDictionary.html.mediaType;
                    return body.raw;
            }
    }
}




/**
 * request接口代理发送测试
 * Proxy send test
 */
export const localProxySendTest=async (data)=>{
    const {bodys=data.body,headers=data.header,method=data.methodType,url} = data;

    //当前执行的请求的接口参数
    let queryHeader=Object.assign({}, {"User-Agent":"PostIn/1.0.0"}, {...headers})


    //request接口 请求头
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

    //处理后的查询参数
    let axiosQuery =processPiHeader(queryHeader,data)

    //request接口 请求地址
    let fetchUrl

    if (IS_DEV) {
        fetchUrl = `/request?${axiosQuery}`;
    } else {
        const baseUrl = window.location.origin;
        fetchUrl = `${baseUrl}/request?${axiosQuery}`;
    }

    //请求
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
 * 处理响应数据
 */
const processResponse = (res) =>{
    let responseData ={}

    if(Object.keys(res.headers).length>0){

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
    }

    responseData = Object.assign({},responseData,{
        body:res.data,
        error:res.error
    })

    return responseData
}

/**
 * 把当前请求的接口基础信息放到query参数里请求，转换成query字符参数?a=b&c=d
 */
const processPiHeader = (queryHeader,data) =>{
    let {query,url,methodType} = data

    //头部
    let queryHeaderStr = Object.entries(queryHeader).map(([key, value]) => `${key}:${value}`).join(",");

    const queryString = buildQueryString(query);

    let queryHeaderObj=  {"pi-header":queryHeaderStr,"pi-url":`${queryString?`${url}?${queryString}`:url}`,"pi-method":methodType}

    return Object.keys(queryHeaderObj).map(key => key + '=' + queryHeaderObj[key]).join('&');
}

/**
 * 生成地址后面的参数
 */
function buildQueryString(query) {
    if (!query) return '';

    return Object.entries(query)?.map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join('&');
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



