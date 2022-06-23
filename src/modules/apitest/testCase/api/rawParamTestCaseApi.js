import {Axios as service} from "doublekit-core-ui";
// RawParamCase
export function createRawParamTestCase(data){
    return service.request({
        url: "/rawParamCase/createRawParamCase",
        method: "post",
        data 
    })
}

export function deleteRawParamTestCase(data){
    return service.request({
        url: "/rawParamCase/deleteRawParamCase",
        method: "post",
        data 
    })
}

export function updateRawParamTestCase(data){
    return service.request({
        url: "/rawParamCase/updateRawParamCase",
        method: "post",
        data 
    })
}

export function findRawParamTestCase(data){
    return service.request({
        url: "/rawParamCase/findRawParamCase",
        method: "post",
        data 
    })
}

export function findRawParamTestCaseList(data){
    return service.request({
        url: "/rawParamCase/findRawParamCaseList",
        method: "post",
        data 
    })
}

