import {Axios as service} from "tiklab-core-ui";
// JsonParamCase
export function createJsonParamTestCase(data){
    return service.request({
        url: "/jsonParamCase/createJsonParamCase",
        method: "post",
        data 
    })
}

export function deleteJsonParamTestCase(data){
    return service.request({
        url: "/jsonParamCase/deleteJsonParamCase",
        method: "post",
        data 
    })
}

export function updateJsonParamTestCase(data){
    return service.request({
        url: "/jsonParamCase/updateJsonParamCase",
        method: "post",
        data 
    })
}

export function findJsonParamTestCase(data){
    return service.request({
        url: "/jsonParamCase/findJsonParamCase",
        method: "post",
        data 
    })
}

export function findJsonParamTestCaseList(data){
    return service.request({
        url: "/jsonParamCase/findJsonParamCaseList",
        method: "post",
        data 
    })
}

export function findJsonParamTestCaseListTree(data){
    return service.request({
        url: "/jsonParamCase/findJsonParamCaseListTree",
        method: "post",
        data 
    })
}
