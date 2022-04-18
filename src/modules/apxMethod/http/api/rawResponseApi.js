import {Axios as service} from "doublekit-core-ui";

export function createRawResponse(data){
    return service.request({
        url: "/rawResponse/createRawResponse",
        method: "post",
        data 
    })
}

export function updateRawResponse(data){
    return service.request({
        url: "/rawResponse/updateRawResponse",
        method: "post",
        data 
    })
}

export function deleteRawResponse(data){
    return service.request({
        url: "/rawResponse/deleteRawResponse",
        method: "post",
        data 
    })
}

export function findRawResponse(data){
    return service.request({
        url: "/rawResponse/findRawResponse",   
        method: "post",
        data 
    })
}

export function findRawResponseList(data){
    return service.request({
        url: "/rawResponse/findRawResponseList",  
        method: "post",
        data 
    })
}

