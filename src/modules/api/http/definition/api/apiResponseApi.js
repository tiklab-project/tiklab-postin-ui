import {Axios as service} from "tiklab-core-ui";
export function createApiResponse(data){
    return service.request({
        url: "/apiResponse/createApiResponse",
        method: "post",
        data 
    })
}

export function updateApiResponse(data){
    return service.request({
        url: "/apiResponse/updateApiResponse",
        method: "post",
        data 
    })
}

export function deleteApiResponse(data){
    return service.request({
        url: "/apiResponse/deleteApiResponse",
        method: "post",
        data 
    })
}

export function findApiResponse(data){
    return service.request({
        url: "/apiResponse/findApiResponse",   
        method: "post",
        data 
    })
}

export function findApiResponseList(data){
    return service.request({
        url: "/apiResponse/findApiResponseList",
        method: "post",
        data
    })
}

