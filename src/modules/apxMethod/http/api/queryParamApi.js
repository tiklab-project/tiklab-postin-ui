import {Axios as service} from "tiklab-core-ui";
export function createQueryParam(data){
    return service.request({
        url: "/queryParam/createQueryParam",
        method: "post",
        data 
    })
}

export function updateQueryParam(data){
    return service.request({
        url: "/queryParam/updateQueryParam",
        method: "post",
        data 
    })
}

export function deleteQueryParam(data){
    return service.request({
        url: "/queryParam/deleteQueryParam",
        method: "post",
        data 
    })
}

export function findQueryParam(data){
    return service.request({
        url: "/queryParam/findQueryParam",   
        method: "post",
        data 
    })
}

export function findQueryParamList(data){
    return service.request({
        url: "/queryParam/findQueryParamList",  
        method: "post",
        data 
    })
}

