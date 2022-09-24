import {Axios as service} from "tiklab-core-ui";

export function createApiRequest(data){
    return service.request({
        url: "/apiRequest/createApiRequest",
        method: "post",
        data 
    })
}

export function deleteApiRequest(data){
    return service.request({
        url: "/apiRequest/deleteApiRequest",
        method: "post",
        data 
    })
}

export function updateApiRequest(data){
    return service.request({
        url: "/apiRequest/updateApiRequest",
        method: "post",
        data 
    })
}

export function findApiRequest(data){
    return service.request({
        url: "/apiRequest/findApiRequest",
        method: "post",
        data 
    })
}

