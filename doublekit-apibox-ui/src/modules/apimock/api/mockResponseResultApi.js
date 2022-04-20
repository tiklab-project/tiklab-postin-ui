import {Axios as service} from "doublekit-core-ui";

export function createResponseResultMock(data){
    return service.request({
        url: "/responseResultMock/createResponseResultMock",
        method: "post",
        data 
    })
}

export function updateResponseResultMock(data){
    return service.request({
        url: "/responseResultMock/updateResponseResultMock",
        method: "post",
        data 
    })
}

export function deleteResponseResultMock(data){
    return service.request({
        url: "/responseResultMock/deleteResponseResultMock",
        method: "post",
        data 
    })
}

//根据接口ID查找接口
export function findResponseResultMock(data){
    return service.request({
        url: "/responseResultMock/findResponseResultMock",   
        method: "post",
        data 
    })
}

