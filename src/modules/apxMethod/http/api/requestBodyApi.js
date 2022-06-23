import {Axios as service} from "doublekit-core-ui";
export function createRequestBody(data){
    return service.request({
        url: "/requestBody/createRequestBody",
        method: "post",
        data 
    })
}

export function deleteRequestBody(data){
    return service.request({
        url: "/requestBody/deleteRequestBody",
        method: "post",
        data 
    })
}

export function updateRequestBody(data){
    return service.request({
        url: "/requestBody/updateRequestBody",
        method: "post",
        data 
    })
}

export function findRequestBody(data){
    return service.request({
        url: "/requestBody/findRequestBody",
        method: "post",
        data 
    })
}

export function findRequestBodyListTree(data){
    return service.request({
        url: "/requestBody/findRequestBodyListTree",
        method: "post",
        data 
    })
}

