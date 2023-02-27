import {Axios as service} from "tiklab-core-ui";
// FormParamCase
export function createFormParamTestCase(data){
    return service.request({
        url: "/formParamCase/createFormParamCase",
        method: "post",
        data 
    })
}

export function deleteFormParamTestCase(data){
    return service.request({
        url: "/formParamCase/deleteFormParamCase",
        method: "post",
        data 
    })
}

export function updateFormParamTestCase(data){
    return service.request({
        url: "/formParamCase/updateFormParamCase",
        method: "post",
        data 
    })
}

export function findFormParamTestCase(data){
    return service.request({
        url: "/formParamCase/findFormParamCase",
        method: "post",
        data 
    })
}

export function findFormParamTestCaseList(data){
    return service.request({
        url: "/formParamCase/findFormParamCaseList",
        method: "post",
        data 
    })
}

