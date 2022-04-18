/*
 * @Description: 前置脚本接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:40:34
 */


import {Axios as service} from "doublekit-core-ui";

export function createPreScript(data){
    return service.request({
        url: "/preScript/createPreScript",
        method: "post",
        data 
    })
}

export function updatePreScript(data){
    return service.request({
        url: "/preScript/updatePreScript",
        method: "post",
        data 
    })
}

export function deletePreScript(data){
    return service.request({
        url: "/preScript/deletePreScript",
        method: "post",
        data 
    })
}

export function findPreScript(data){
    return service.request({
        url: "/preScript/findPreScript",   
        method: "post",
        data 
    })
}

export function findPreScriptList(data){
    return service.request({
        url: "/preScript/findPreScriptList",  
        method: "post",
        data 
    })
}

