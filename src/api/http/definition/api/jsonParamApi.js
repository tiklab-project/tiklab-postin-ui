/*
 * @Description: request请求体Json接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:39:08
 */


import {Axios} from "tiklab-core-ui";

export function createJsonParam(data){
    return Axios.post("/jsonParam/createJsonParam",data)
}

export function deleteJsonParam(data){
    return Axios.post("/jsonParam/deleteJsonParam",data)
}

export function updateJsonParam(data){
    return Axios.post("/jsonParam/updateJsonParam",data)
}

export function findJsonParam(data){
    return Axios.post("/jsonParam/findJsonParam",data)
}

export function findJsonParamListTree(data){
    return Axios.post("/jsonParam/findJsonParamListTree",data)
}

