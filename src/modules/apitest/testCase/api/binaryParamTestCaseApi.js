/*
 * @Description: request请求体binary接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:37:05
 */


import {Axios} from "tiklab-core-ui";

export function createBinaryParamCase(data){
    return Axios.post("/binaryParamCase/createBinaryParamCase",data)
}

export function deleteBinaryParamCase(data){
    return Axios.post("/binaryParamCase/deleteBinaryParamCase",data)
}

export function updateBinaryParamCase(data){
    return Axios.post("/binaryParamCase/updateBinaryParamCase",data)
}

export function findBinaryParamCase(data){
    return Axios.post("/binaryParamCase/findBinaryParamCase",data)
}

export function findBinaryParamCaseList(data){
    return Axios.post("/binaryParamCase/findBinaryParamCaseList",data)
}

