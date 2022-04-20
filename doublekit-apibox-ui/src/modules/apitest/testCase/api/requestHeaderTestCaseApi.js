import {Axios as service} from "doublekit-core-ui";
// RequestHeaderCase
export function createRequestHeaderTestCase(data){
    return service.request({
        url: "/requestHeaderCase/createRequestHeaderCase",
        method: "post",
        data 
    })
}

export function deleteRequestHeaderTestCase(data){
    return service.request({
        url: "/requestHeaderCase/deleteRequestHeaderCase",
        method: "post",
        data 
    })
}

export function updateRequestHeaderTestCase(data){
    return service.request({
        url: "/requestHeaderCase/updateRequestHeaderCase",
        method: "post",
        data 
    })
}

export function findRequestHeaderTestCase(data){
    return service.request({
        url: "/requestHeaderCase/findRequestHeaderCase",
        method: "post",
        data 
    })
}

export function findRequestHeaderTestCaseList(data){
    return service.request({
        url: "/requestHeaderCase/findRequestHeaderCaseList",
        method: "post",
        data 
    })
}

