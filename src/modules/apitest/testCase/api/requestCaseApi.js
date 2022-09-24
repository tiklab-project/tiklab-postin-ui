import {Axios as service} from "tiklab-core-ui";

export function createRequestCase(data){
    return service.request({
        url: "/requestCase/createRequestCase",
        method: "post",
        data
    })
}

export function deleteRequestCase(data){
    return service.request({
        url: "/requestCase/deleteRequestCase",
        method: "post",
        data
    })
}

export function updateRequestCase(data){
    return service.request({
        url: "/requestCase/updateRequestCase",
        method: "post",
        data
    })
}

export function findRequestCase(data){
    return service.request({
        url: "/requestCase/findRequestCase",
        method: "post",
        data
    })
}

