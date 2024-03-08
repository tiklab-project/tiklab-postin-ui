import {createID} from "../../common/utils/createId";
import {mediaTypeDir} from "../../common/dictionary/dictionary";

/**
 * header处理
 */
export const processHeaderData = (data) =>{
    if(!data) return [{ "id":createID()}]

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


export const getMediaType = (value) => {
    let bodyType

    //设置body下的body类型
    switch (value){
        case mediaTypeDir.none.mediaType:
            bodyType = mediaTypeDir.none.title
            break;
        case mediaTypeDir.formdata.mediaType:
            bodyType = mediaTypeDir.formdata.title
            break;
        case mediaTypeDir.formUrlencoded.mediaType:
            bodyType = mediaTypeDir.formUrlencoded.title
            break;
        default :
            bodyType = mediaTypeDir.raw.title
            break;
    }

    return bodyType
}
