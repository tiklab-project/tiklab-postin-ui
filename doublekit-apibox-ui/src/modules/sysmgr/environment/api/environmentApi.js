import {Axios as service} from "doublekit-core-ui";

export function deleteEnvironment(data){
    return service.request({
        url: "/environment/deleteEnvironment",
        method: "post",
        data 
    })
}

export function createEnvironment(data){
    return service.request({
        url: "/environment/createEnvironment",
        method: "post",
        data 
    })
}

export function findEnvironment(data){
    return service.request({
        url: "/environment/findEnvironment",
        method: "post",
        data 
    })
}

export function updateEnvironment(data){
    return service.request({
        url: "/environment/updateEnvironment",
        method: "post",
        data 
    })
}

export function findEnvironmentPage(data){
    return service.request({
        url: "/environment/findEnvironmentPage",
        method: "post",
        data 
    })
}

export function findEnvironmentList(data){
    return service.request({
        url: "/environment/findEnvironmentList",
        method: "post",
        data 
    })
}
