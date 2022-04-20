import {Axios as service} from "doublekit-core-ui";
// AfterScriptCase
export function createAfterScriptTestCase(data){
    return service.request({
        url: "/afterScriptCase/createAfterScriptCase",
        method: "post",
        data 
    })
}

export function deleteAfterScriptTestCase(data){
    return service.request({
        url: "/afterScriptCase/deleteAfterScriptCase",
        method: "post",
        data 
    })
}

export function updateAfterScriptTestCase(data){
    return service.request({
        url: "/afterScriptCase/updateAfterScriptCase",
        method: "post",
        data 
    })
}

export function findAfterScriptTestCase(data){
    return service.request({
        url: "/afterScriptCase/findAfterScriptCase",
        method: "post",
        data 
    })
}

export function findAfterScriptTestCaseList(data){
    return service.request({
        url: "/afterScriptCase/findAfterScriptCaseList",
        method: "post",
        data 
    })
}

