import {Axios as service} from "tiklab-core-ui";

export function createApiStatus(data){
    return service.request({
        url: "/apiStatus/createApiStatus",
        method: "post",
        data
    })
}

export function deleteApiStatus(data){
    return service.request({
        url: "/apiStatus/deleteApiStatus",
        method: "post",
        data
    })
}

export function updateApiStatus(data){
    return service.request({
        url: "/apiStatus/updateApiStatus",
        method: "post",
        data
    })
}

export function findApiStatus(data){
    return service.request({
        url: "/apiStatus/findApiStatus",
        method: "post",
        data
    })
}

export function findAllApiStatus(data){
    return service.request({
        url: "/apiStatus/findAllApiStatus",
        method: "post",
        data
    })
}

export function findApiStatusPage(data){
    return service.request({
        url: "/apiStatus/findApiStatusPage",
        method: "post",
        data
    })
}

export function findApiStatusList(data){
    return service.request({
        url: "/apiStatus/findApiStatusList",
        method: "post",
        data
    })
}


