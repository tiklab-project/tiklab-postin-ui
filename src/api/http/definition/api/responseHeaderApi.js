import {Axios as service} from "tiklab-core-ui";
export function createResponseHeader(data){
    return service.request({
        url: "/responseHeader/createResponseHeader",
        method: "post",
        data 
    })
}

export function updateResponseHeader(data){
    return service.request({
        url: "/responseHeader/updateResponseHeader",
        method: "post",
        data 
    })
}

export function deleteResponseHeader(data){
    return service.request({
        url: "/responseHeader/deleteResponseHeader",
        method: "post",
        data 
    })
}

export function findResponseHeader(data){
    return service.request({
        url: "/responseHeader/findResponseHeader",   
        method: "post",
        data 
    })
}

export function findResponseHeaderList(data){
    return service.request({
        url: "/responseHeader/findResponseHeaderList",  
        method: "post",
        data 
    })
}

