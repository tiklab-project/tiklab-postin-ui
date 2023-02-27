import {Axios as service} from "tiklab-core-ui";
export function createRequestHeader(data){
    return service.request({
        url: "/requestHeader/createRequestHeader",
        method: "post",
        data 
    })
}

export function updateRequestHeader(data){
    return service.request({
        url: "/requestHeader/updateRequestHeader",
        method: "post",
        data 
    })
}

export function deleteRequestHeader(data){
    return service.request({
        url: "/requestHeader/deleteRequestHeader",
        method: "post",
        data 
    })
}

export function findRequestHeader(data){
    return service.request({
        url: "/requestHeader/findRequestHeader",   
        method: "post",
        data 
    })
}

export function findRequestHeaderList(data){
    return service.request({
        url: "/requestHeader/findRequestHeaderList",  
        method: "post",
        data 
    })
}

