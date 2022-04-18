import {Axios as service} from "doublekit-core-ui";

export function createRawParam(data){
    return service.request({
        url: "/rawParam/createRawParam",
        method: "post",
        data 
    })
}

export function updateRawParam(data){
    return service.request({
        url: "/rawParam/updateRawParam",
        method: "post",
        data 
    })
}

export function deleteRawParam(data){
    return service.request({
        url: "/rawParam/deleteRawParam",
        method: "post",
        data 
    })
}

export function findRawParam(data){
    return service.request({
        url: "/rawParam/findRawParam",   
        method: "post",
        data 
    })
}

export function findRawParamList(data){
    return service.request({
        url: "/rawParam/findRawParamList",  
        method: "post",
        data 
    })
}

