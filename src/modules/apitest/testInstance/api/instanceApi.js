import {Axios as service} from "doublekit-core-ui";

export function deleteInstance(data){
    return service.request({
        url: "/testInstance/deleteTestInstance",
        method: "post",
        data 
    })
}

export function deleteAllInstance(data){
    return service.request({
        url: "/testInstance/deleteAllTestInstance",
        method: "post",
        data
    })
}

export function createInstance(data){
    return service.request({
        url: "/testInstance/createTestInstance",
        method: "post",
        data 
    })
}

export function updateInstance(data){
    return service.request({
        url: "/testInstance/updateTestInstance",
        method: "post",
        data 
    })
}

export function findInstance(data){
    return service.request({
        url: "/testInstance/findTestInstance",
        method: "post",
        data 
    })
}

export function findInstanceList(data){
    return service.request({
        url: "/testInstance/findTestInstanceList",
        method: "post",
        data 
    })
}

export function findInstancePage(data){
    return service.request({
        url: "/testInstance/findTestInstancePage",
        method: "post",
        data 
    })
}
