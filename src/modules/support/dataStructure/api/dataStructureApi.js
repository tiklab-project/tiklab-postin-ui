/**
 * @description：
 * @date: 2021-07-29 11:27
 */

import {Axios as service} from "tiklab-core-ui";

export function findDataStructurePage(data){
    return service.request({
        url: "/dataStructure/findDataStructurePage",
        method: "post",
        data
    })
}

export function findDataStructureList(data){
    return service.request({
        url: "/dataStructure/findDataStructureList",
        method: "post",
        data
    })
}

export function findDataStructure(data){
    return service.request({
        url: "/dataStructure/findDataStructure",
        method: "post",
        data
    })
}

export function createDataStructure(data){
    return service.request({
        url: "/dataStructure/createDataStructure",
        method: "post",
        data
    })
}

export function deleteDataStructure(data){
    return service.request({
        url: "/dataStructure/deleteDataStructure",
        method: "post",
        data
    })
}

export function updateDataStructure(data){
    return service.request({
        url: "/dataStructure/updateDataStructure",
        method: "post",
        data
    })
}
