import {Axios as service} from "tiklab-core-ui";

export function createJsonResponseMock(data){
    return service.request({
        url: "/jsonResponseMock/createJsonResponseMock",
        method: "post",
        data 
    })
}
export function updateJsonResponseMock(data){
    return service.request({
        url: "/jsonResponseMock/updateJsonResponseMock",
        method: "post",
        data 
    })
}

export function deleteJsonResponseMock(data){
    return service.request({
        url: "/jsonResponseMock/deleteJsonResponseMock",
        method: "post",
        data 
    })
}

export function findJsonResponseMock(data){
    return service.request({
        url: "/jsonResponseMock/findJsonResponseMock",
        method: "post",
        data 
    })
}


export function findJsonResponseMockList(data){
    return service.request({
        url: "/jsonResponseMock/findJsonResponseMockList",
        method: "post",
        data 
    })
}
