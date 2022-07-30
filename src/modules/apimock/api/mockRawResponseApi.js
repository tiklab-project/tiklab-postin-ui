import {Axios as service} from "tiklab-core-ui";

export function createRawResponseMock(data){
    return service.request({
        url: "/rawResponseMock/createRawResponseMock",
        method: "post",
        data 
    })
}
export function updateRawResponseMock(data){
    return service.request({
        url: "/rawResponseMock/updateRawResponseMock",
        method: "post",
        data 
    })
}

export function deleteRawResponseMock(data){
    return service.request({
        url: "/rawResponseMock/deleteRawResponseMock",
        method: "post",
        data 
    })
}

export function findRawResponseMock(data){
    return service.request({
        url: "/rawResponseMock/findRawResponseMock",
        method: "post",
        data 
    })
}


export function findRawResponseMockList(data){
    return service.request({
        url: "/rawResponseMock/findRawResponseMockList",
        method: "post",
        data 
    })
}
