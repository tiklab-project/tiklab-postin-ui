/*
 * @Description: response Json接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:39:25
 */


import {Axios as service} from "tiklab-core-ui";

export function createJsonResponse(data){
    return service.request({
        url: "/jsonResponse/createJsonResponse",
        method: "post",
        data 
    })
}

export function deleteJsonResponse(data){
    return service.request({
        url: "/jsonResponse/deleteJsonResponse",
        method: "post",
        data 
    })
}

export function updateJsonResponse(data){
    return service.request({
        url: "/jsonResponse/updateJsonResponse",
        method: "post",
        data 
    })
}

export function findJsonResponse(data){
    return service.request({
        url: "/jsonResponse/findJsonResponse",
        method: "post",
        data 
    })
}

export function findJsonResponseListTree(data){
    return service.request({
        url: "/jsonResponse/findJsonResponseListTree ",
        method: "post",
        data 
    })
}

