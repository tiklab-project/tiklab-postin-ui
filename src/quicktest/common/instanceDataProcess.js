import {createID} from "../../common/utils/createId";
import {bodyTypeJsonDictionary as bodyTypeJsonDic} from "../../common/dictionary/dictionary";

/**
 * header处理
 */
export const processHeaderData = (data) =>{
    if(!!data) return []

    let json = JSON.parse(data);

    let arr = [];

    for (let key in json){
        arr.push({
            "headerName":key,
            "value":json[key],
            "id":createID(),
        })
    }
    return arr;
}

/**
 * Query处理
 */
export const processQueryData = (url) =>{
    if(!!url) return []
    let arr = [];

    //如果没有url后参数直接return
    if(url.indexOf('?')===-1){
        return
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





export const getMediaType = (value) => {
    let bodyType

    //设置body下的body类型
    switch (value){
        case "none":
            bodyType =bodyTypeJsonDic.none
            break;
        case "multipart/form-data":
            bodyType = bodyTypeJsonDic.formdata
            break;
        case "application/x-www-form-urlencoded":
            bodyType = bodyTypeJsonDic.formUrlencoded
            break;
        //如果是application/json，直接设置成raw中application/json
        case "application/json":
            bodyType = bodyTypeJsonDic.raw
            break;
        default :
            bodyType = bodyTypeJsonDic.none
            break;
    }

    return bodyType
}
