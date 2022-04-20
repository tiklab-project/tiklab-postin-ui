import {Axios as service} from "doublekit-core-ui";

export function createQueryParamMock(data){
    return service.request({
        url: "/queryParamMock/createQueryParamMock",
        method: "post",
        data 
    })
}
export function updateQueryParamMock(data){
    return service.request({
        url: "/queryParamMock/updateQueryParamMock",
        method: "post",
        data 
    })
}

export function deleteQueryParamMock(data){
    return service.request({
        url: "/queryParamMock/deleteQueryParamMock",
        method: "post",
        data 
    })
}

export function findQueryParamMock(data){
    return service.request({
        url: "/queryParamMock/findQueryParamMock",
        method: "post",
        data 
    })
}

export function findQueryParamMockList(data){
    return service.request({
        url: "/queryParamMock/findQueryParamMockList",
        method: "post",
        data 
    })
}
