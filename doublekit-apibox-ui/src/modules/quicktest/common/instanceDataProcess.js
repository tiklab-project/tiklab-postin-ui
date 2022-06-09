import {createID} from "../../../common/utils/createId";

//header处理
export const processHeaderData = (data) =>{
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

export const processQueryData = (url) =>{
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



