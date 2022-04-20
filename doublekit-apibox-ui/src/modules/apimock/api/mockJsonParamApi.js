import {Axios as service} from "doublekit-core-ui";

export function createJsonParamMock(data){
    return service.request({
        url: "/jsonParamMock/createJsonParamMock",
        method: "post",
        data 
    })
}

export function updateJsonParamMock(data){
    return service.request({
        url: "/jsonParamMock/updateJsonParamMock",
        method: "post",
        data 
    })
}

export function deleteJsonParamMock(data){
    return service.request({
        url: "/jsonParamMock/deleteJsonParamMock",
        method: "post",
        data 
    })
}

export function findJsonParamMock(data){
    return service.request({
        url: "/jsonParamMock/findJsonParamMock",
        method: "post",
        data 
    })
}

export function findJsonParamMockList(data){
    return service.request({
        url: "/jsonParamMock/findJsonParamMockList",
        method: "post",
        data 
    })
}
