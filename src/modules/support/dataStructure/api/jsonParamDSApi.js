/**
 * @description：
 * @date: 2021-07-29 18:25
 */

import {Axios as service} from "tiklab-core-ui";

export function findJsonParamDSListTree(data){
    return service.request({
        url: "/jsonParamDS/findJsonParamDSListTree",
        method: "post",
        data
    })
}

export function findJsonParamDS(data){
    return service.request({
        url: "/jsonParamDS/findJsonParamDS",
        method: "post",
        data
    })
}

export function createJsonParamDS(data){
    return service.request({
        url: "/jsonParamDS/createJsonParamDS",
        method: "post",
        data
    })
}

export function deleteJsonParamDS(data){
    return service.request({
        url: "/jsonParamDS/deleteJsonParamDS",
        method: "post",
        data
    })
}

export function updateJsonParamDS(data){
    return service.request({
        url: "/jsonParamDS/updateJsonParamDS",
        method: "post",
        data
    })
}
