import {Axios as service} from "doublekit-core-ui";

// requestBodyMock
export function createRequestBodyMock(data){
    return service.request({
        url: "/requestBodyMock/createRequestBodyMock",
        method: "post",
        data 
    })
}

export function deleteRequestBodyMock(data){
    return service.request({
        url: "/requestBodyMock/deleteRequestBodyMock",
        method: "post",
        data 
    })
}

export function updateRequestBodyMock(data){
    return service.request({
        url: "/requestBodyMock/updateRequestBodyMock",
        method: "post",
        data 
    })
}

export function findRequestBodyMock(data){
    return service.request({
        url: "/requestBodyMock/findRequestBodyMock",
        method: "post",
        data 
    })
}

