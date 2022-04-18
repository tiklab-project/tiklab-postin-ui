/*
 * @Description: 后置脚本接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:35:50
 */

import { Axios } from "doublekit-core-ui";

export function createAfterScript(data){
    return Axios.post("/afterScript/createAfterScript",data)
}

export function updateAfterScript(data){
    return Axios.post("/afterScript/updateAfterScript",data)
}

export function deleteAfterScript(data){
    return Axios.post("/afterScript/deleteAfterScript",data)
}

export function findAfterScript(data){
    return Axios.post("/afterScript/findAfterScript",data)
}

export function findAfterScriptList(data){
    return Axios.post("/afterScript/findAfterScriptList",data)
}

