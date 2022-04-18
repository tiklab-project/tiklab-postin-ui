import {Axios as service} from "doublekit-core-ui";
// import '../../formParamMock/formParamFormParamMock';

export function createFormParamMock(data){
    return service.request({
        url: "/formParamMock/createFormParamMock",
        method: "post",
        data 
    })
}
export function updateFormParamMock(data){
    return service.request({
        url: "/formParamMock/updateFormParamMock",
        method: "post",
        data 
    })
}

export function deleteFormParamMock(data){
    return service.request({
        url: "/formParamMock/deleteFormParamMock",
        method: "post",
        data 
    })
}

export function findFormParamMock(data){
    return service.request({
        url: "/formParamMock/findFormParamMock",
        method: "post",
        data 
    })
}


export function findFormParamMockList(data){
    return service.request({
        url: "/formParamMock/findFormParamMockList",
        method: "post",
        data 
    })
}
