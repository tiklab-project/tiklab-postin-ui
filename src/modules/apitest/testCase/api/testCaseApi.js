import {Axios } from "doublekit-core-ui";

export function deleteTestCase(data){
    return Axios.request({
        url: "/testcase/deleteTestcase",
        method: "post",
        data 
    })
}

export function createTestCase(data){
    return Axios.request({
        url: "/testcase/createTestcase",
        method: "post",
        data 
    })
}

export function updateTestCase(data){
    return Axios.request({
        url: "/testcase/updateTestcase",
        method: "post",
        data 
    })
}

export function findTestCase(data){
    return Axios.request({
        url: "/testcase/findTestcase",
        method: "post",
        data 
    })
}

export function findTestCaseList(data){
    return Axios.request({
        url: "/testcase/findTestcaseList",
        method: "post",
        data 
    })
}

export function findTestCasePage(data){
    return Axios.request({
        url: "/testcase/findTestcasePage",
        method: "post",
        data 
    })
}

export function createTestcaseWithNest(data){
    return Axios.request({
        url: "/testcase/createTestcaseWithNest",
        method: "post",
        data 
    })
}


