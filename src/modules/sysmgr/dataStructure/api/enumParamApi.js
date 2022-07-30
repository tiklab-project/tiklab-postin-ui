/**
 * @description：
 * @date: 2021-07-29 18:25
 */
import {Axios as service} from "tiklab-core-ui";

export function findEnumParamListDS(data){
    return service.request({
        url: "/enumParamDS/findEnumParamListDS",
        method: "post",
        data
    })
}

export function findEnumParamDS(data){
    return service.request({
        url: "/enumParamDS/findEnumParamDS",
        method: "post",
        data
    })
}

export function createEnumParamDS(data){
    return service.request({
        url: "/enumParamDS/createEnumParamDS",
        method: "post",
        data
    })
}

export function deleteEnumParamDS(data){
    return service.request({
        url: "/enumParamDS/deleteEnumParamDS",
        method: "post",
        data
    })
}

export function updateEnumParamDS(data){
    return service.request({
        url: "/enumParamDS/updateEnumParamDS",
        method: "post",
        data
    })
}
