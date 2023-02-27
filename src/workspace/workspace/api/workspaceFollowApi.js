
/*
 * @Description: 空间接口
 * @Author: sunxiancheng
 * @LastEditTime: 2022-06-17 20:28:21
 */
import { Axios } from "tiklab-core-ui";

export function deleteWorkspaceFollow(data){
    return Axios.post("/workspaceFollow/deleteWorkspaceFollow",data)
}

export function createWorkspaceFollow(data){
    return Axios.post("/workspaceFollow/createWorkspaceFollow",data)
}

export function findWorkspaceFollow(data){
    return Axios.post("/workspaceFollow/findWorkspaceFollow",data)
}

export function updateWorkspaceFollow(data){
    return Axios.post("/workspaceFollow/updateWorkspaceFollow",data)
}

export function findAllWorkspaceFollow(data){
    return Axios.post("/workspaceFollow/findAllWorkspaceFollow",data)
}

export function findWorkspaceFollowPage(data){
    return Axios.post("/workspaceFollow/findWorkspaceFollowPage",data)
}

export function findWorkspaceFollowList(data){
    return Axios.post("/workspaceFollow/findWorkspaceFollowList",data)
}

