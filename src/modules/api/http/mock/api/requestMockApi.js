import {Axios as service} from "tiklab-core-ui";

// requestMock
export function createRequestMock(data){
    return service.request({
        url: "/requestMock/createRequestMock",
        method: "post",
        data 
    })
}

export function deleteRequestMock(data){
    return service.request({
        url: "/requestMock/deleteRequestMock",
        method: "post",
        data 
    })
}

export function updateRequestMock(data){
    return service.request({
        url: "/requestMock/updateRequestMock",
        method: "post",
        data 
    })
}

export function findRequestMock(data){
    return service.request({
        url: "/requestMock/findRequestMock",
        method: "post",
        data 
    })
}

