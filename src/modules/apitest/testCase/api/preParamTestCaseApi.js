import {Axios as service} from "tiklab-core-ui";
// PreScriptCase
export function createPreParamTestCase(data){
    return service.request({
        url: "/preScriptCase/createPreScriptCase",
        method: "post",
        data 
    })
}

export function deletePreParamTestCase(data){
    return service.request({
        url: "/preScriptCase/deletePreScriptCase",
        method: "post",
        data 
    })
}

export function updatePreParamTestCase(data){
    return service.request({
        url: "/preScriptCase/updatePreScriptCase",
        method: "post",
        data 
    })
}

export function findPreParamTestCase(data){
    return service.request({
        url: "/preScriptCase/findPreScriptCase",
        method: "post",
        data 
    })
}

export function findPreParamTestCaseList(data){
    return service.request({
        url: "/preScriptCase/findPreScriptCaseList",
        method: "post",
        data 
    })
}

