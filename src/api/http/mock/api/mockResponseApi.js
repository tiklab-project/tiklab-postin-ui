import {Axios as service} from "tiklab-core-ui";

export function createResponseMock(data){
    return service.request({
        url: "/responseMock/createResponseMock",
        method: "post",
        data 
    })
}

export function updateResponseMock(data){
    return service.request({
        url: "/responseMock/updateResponseMock",
        method: "post",
        data 
    })
}

export function deleteResponseMock(data){
    return service.request({
        url: "/responseMock/deleteResponseMock",
        method: "post",
        data 
    })
}

//根据接口ID查找接口
export function findResponseMock(data){
    return service.request({
        url: "/responseMock/findResponseMock",   
        method: "post",
        data 
    })
}
