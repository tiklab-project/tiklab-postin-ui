import {createID} from "../../common/utils/createId";
import {mediaTypeDir} from "../../common/dictionary/dictionary";

/**
 * header处理
 */
export const processHeaderData = (data) =>{
    let initRow = { "id":createID()}

    if(!data) return [initRow]

    let json = JSON.parse(data);
    let arr = [];
    for (let key in json){
        arr.push({
            "headerName":key,
            "value":json[key],
            "id":createID(),
        })
    }

    return [...arr,initRow];
}

/**
 * Query处理
 */
export const processQueryData = (url) =>{
    if(!url) return [{ "id":createID()}]
    let arr = [];

    //如果没有url后参数直接return
    if(url.indexOf('?')===-1){
        return [{ "id":createID()}]
    }

    // 先把字符 ? 后面的字符截取出来
    let newStr = url.substr(url.indexOf('?') + 1)

    // 通过 reduce 方法进行处理
    let newObj = newStr.split('&')
        .reduce((obj, item) => ((obj[item.split('=')[0]] = item.split('=')[1]), obj), {})

    for (let key in newObj){
        arr.push({
            "paramName":key,
            "value":newObj[key],
            "id":createID(),
        })
    }

    return arr;
}

/**
 * formData处理
 */
export const processFormParamData = (data) =>{
    if(!data) return [{ "id":createID()}]

    let json = JSON.parse(data);
    let arr = [];

    for (let key in json){
        arr.push({
            "paramName":key,
            "dataType":"string",
            "value":json[key],
            "id":createID(),
        })
    }
    return arr;
}

/**
 * FormUrlencoded处理
 */
export const processFormUrlencodedData = (data) =>{
    if(!data) return [{ "id":createID()}]

    let json = JSON.parse(data);
    let arr = [];

    for (let key in json){
        arr.push({
            "paramName":key,
            "dataType":"string",
            "value":json[key],
            "id":createID(),
        })
    }
    return arr;
}


export const getMediaType = (type) => {
    if(!type){
        return mediaTypeDir.none.title
    }

    //设置body下的body类型
    switch (type){
        case mediaTypeDir.formdata.mediaType:
            return mediaTypeDir.formdata.title
        case mediaTypeDir.formUrlencoded.mediaType:
            return mediaTypeDir.formUrlencoded.title
        default :
            return mediaTypeDir.raw.title
    }
}

const processBody = (data) => {
    if (!data) return '';

    return JSON.parse(data)
};



//响应
export const processResponse = (res) =>{
    let responseHeaders = res.responseInstance?.headers?JSON.parse(res.responseInstance?.headers):null;
    let body = processBody(res.responseInstance?.body)

    return {
        body:body,
        headers:responseHeaders,
        size:res.size,
        statusCode:res.statusCode,
        time:res.time,
        errorMessage:res.errorMessage,
        assertList:res.assertInstanceList
    }
}
