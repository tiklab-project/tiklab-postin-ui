import { Axios } from "doublekit-core-ui";

export function createVersion(data){
    return Axios.post("/version/createVersion",data)
}

export function compareVersion(data){
    return Axios.post("/version/compareVersion",data)
}

export function findVersionList(data){
    return Axios.post("/version/findVersionList",data)
}
