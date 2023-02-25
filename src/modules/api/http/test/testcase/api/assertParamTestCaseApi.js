import {Axios as service} from "tiklab-core-ui";
// AssertCase
export function createAssertParamTestCase(data){
    return service.request({
        url: "/assertCase/createAssertCase",
        method: "post",
        data 
    })
}

export function deleteAssertParamTestCase(data){
    return service.request({
        url: "/assertCase/deleteAssertCase",
        method: "post",
        data 
    })
}

export function updateAssertParamTestCase(data){
    return service.request({
        url: "/assertCase/updateAssertCase",
        method: "post",
        data 
    })
}

export function findAssertParamTestCase(data){
    return service.request({
        url: "/assertCase/findAssertCase",
        method: "post",
        data 
    })
}

export function findAssertParamTestCaseList(data){
    return service.request({
        url: "/assertCase/findAssertCaseList",
        method: "post",
        data 
    })
}

