import {Axios as service} from "doublekit-core-ui";

// requestBodyTestCase
export function createRequestBodyTestCase(data){
    return service.request({
        url: "/requestBodyCase/createRequestBodyCase",
        method: "post",
        data 
    })
}

export function deleteRequestBodyTestCase(data){
    return service.request({
        url: "/requestBodyCase/deleteRequestBodyCase",
        method: "post",
        data 
    })
}

export function updateRequestBodyTestCase(data){
    return service.request({
        url: "/requestBodyCase/updateRequestBodyCase",
        method: "post",
        data 
    })
}

export function findRequestBodyTestCase(data){
    return service.request({
        url: "/requestBodyCase/findRequestBodyCase",
        method: "post",
        data 
    })
}

export function findRequestBodyTestCaseListTree(data){
    return service.request({
        url: "/requestBodyCase/findRequestBodyCaseListTree",
        method: "post",
        data 
    })
}

