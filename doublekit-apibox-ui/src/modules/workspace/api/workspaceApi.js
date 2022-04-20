/*
 * @Description: 空间接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-25 14:28:21
 */

import { Axios } from "doublekit-core-ui";

export function deleteWorkspace(data){
    return Axios.post("/workspace/deleteWorkspace",data)
}

export function createWorkspace(data){
    return Axios.post("/workspace/createWorkspace",data)
}

export function findWorkspace(data){
    return Axios.post("/workspace/findWorkspace",data)
}

export function updateWorkspace(data){
    return Axios.post("/workspace/updateWorkspace",data)
}

export function findWorkspacePage(data){
    return Axios.post("/workspace/findWorkspacePage",data)
}

export function findWorkspaceList(data){
    return Axios.post("/workspace/findWorkspaceList",data)
}

export function findWorkspaceJoinList(data){
    return Axios.post("/workspace/findWorkspaceJoinList",data)
}
