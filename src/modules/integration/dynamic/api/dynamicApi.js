/*
 * @Description: 空间接口
 * @Author: sunxiancheng
 * @LastEditTime: 2022-06-16 20:28:21
 */

import { Axios } from "doublekit-core-ui";

export function deleteDynamic(data){
    return Axios.post("/dynamic/deleteDynamic",data)
}

export function createDynamic(data){
    return Axios.post("/dynamic/createDynamic",data)
}

export function findDynamic(data){
    return Axios.post("/dynamic/findDynamic",data)
}

export function updateDynamic(data){
    return Axios.post("/dynamic/updateDynamic",data)
}

export function findDynamicPage(data){
    return Axios.post("/dynamic/findDynamicPage",data)
}

export function findDynamicList(data){
    return Axios.post("/dynamic/findDynamicList",data)
}


