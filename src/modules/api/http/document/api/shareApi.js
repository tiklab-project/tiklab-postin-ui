import {Axios as service} from "tiklab-core-ui";

export function createShare(data){
    return service.request({
        url: "/share/createShare",
        method: "post",
        data 
    })
}

export function updateShare(data){
    return service.request({
        url: "/share/updateShare",
        method: "post",
        data 
    })
}

export function deleteShare(data){
    return service.request({
        url: "/share/deleteShare",
        method: "post",
        data 
    })
}

export function findShareList(data){
    return service.request({
        url: "/share/findShareList",
        method: "post",
        data 
    })
}

export function findShare(data){
    return service.request({
        url: "/share/findShare",
        method: "post",
        data 
    })
}

export function findShareTree(data){
    return service.request({
        url: "/share/findShareTree",
        method: "post",
        data 
    })
}
