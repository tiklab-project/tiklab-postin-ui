/*
 * @Description: request请求体form接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:37:05
 */


import {Axios} from "tiklab-core-ui";

export function createFormParam(data){
    return Axios.post("/formParam/createFormParam",data)
}

export function deleteFormParam(data){
    return Axios.post("/formParam/deleteFormParam",data)
}

export function updateFormParam(data){
    return Axios.post("/formParam/updateFormParam",data)
}

export function findFormParam(data){
    return Axios.post("/formParam/findFormParam",data)
}

export function findFormParamList(data){
    return Axios.post("/formParam/findFormParamList",data)
}

