/*
 * @Description: 
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-25 14:04:24
 */
import {Axios as service} from "doublekit-core-ui";
// QueryParamCase
export function createQueryParamTestCase(data){
    return service.request({
        url: "/queryParamCase/createQueryParamCase",
        method: "post",
        data 
    })
}

export function deleteQueryParamTestCase(data){
    return service.request({
        url: "/queryParamCase/deleteQueryParamCase",
        method: "post",
        data 
    })
}

export function updateQueryParamTestCase(data){
    return service.request({
        url: "/queryParamCase/updateQueryParamCase",
        method: "post",
        data 
    })
}

export function findQueryParamTestCase(data){
    return service.request({
        url: "/queryParamCase/findQueryParamCase",
        method: "post",
        data 
    })
}

export function findQueryParamTestCaseList(data){
    return service.request({
        url: "/queryParamCase/findQueryParamCaseList",
        method: "post",
        data 
    })
}

