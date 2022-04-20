import {Axios as service} from "doublekit-core-ui";
export function createResponseResult(data){
    return service.request({
        url: "/responseResult/createResponseResult",
        method: "post",
        data 
    })
}

export function updateResponseResult(data){
    return service.request({
        url: "/responseResult/updateResponseResult",
        method: "post",
        data 
    })
}

export function deleteResponseResult(data){
    return service.request({
        url: "/responseResult/deleteResponseResult",
        method: "post",
        data 
    })
}

export function findResponseResult(data){
    return service.request({
        url: "/responseResult/findResponseResult",   
        method: "post",
        data 
    })
}

