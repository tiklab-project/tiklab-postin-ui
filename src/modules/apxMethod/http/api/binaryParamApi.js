/*
 * @Description: request请求体binary接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:37:05
 */


import {Axios} from "doublekit-core-ui";

export function createBinaryParam(data){
    return Axios.post("/binaryParam/createBinaryParam",data)
}

export function deleteBinaryParam(data){
    return Axios.post("/binaryParam/deleteBinaryParam",data)
}

export function updateBinaryParam(data){
    return Axios.post("/binaryParam/updateBinaryParam",data)
}

export function findBinaryParam(data){
    return Axios.post("/binaryParam/findBinaryParam",data)
}

export function findBinaryParamList(data){
    return Axios.post("/binaryParam/findBinaryParamList",data)
}

export function findBinaryParamByte(data){
    return Axios.post("/binaryParam/findBinaryParamByte",data)
}
