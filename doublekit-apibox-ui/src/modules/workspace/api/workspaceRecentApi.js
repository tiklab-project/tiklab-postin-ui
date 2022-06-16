/*
 * @Description: 空间接口
 * @Author: sunxiancheng
 * @LastEditTime: 2022-06-16 20:28:21
 */

import { Axios } from "doublekit-core-ui";

export function deleteWorkspaceRecent(data){
    return Axios.post("/workspaceRecent/deleteWorkspaceRecent",data)
}

export function createWorkspaceRecent(data){
    return Axios.post("/workspaceRecent/createWorkspaceRecent",data)
}

export function findWorkspaceRecent(data){
    return Axios.post("/workspaceRecent/findWorkspaceRecent",data)
}

export function updateWorkspaceRecent(data){
    return Axios.post("/workspaceRecent/updateWorkspaceRecent",data)
}

export function findWorkspaceRecentPage(data){
    return Axios.post("/workspaceRecent/findWorkspaceRecentPage",data)
}

export function findWorkspaceRecentList(data){
    return Axios.post("/workspaceRecent/findWorkspaceRecentList",data)
}

export function workspaceRecent(data){
    return Axios.post("/workspaceRecent/workspaceRecent",data)
}


