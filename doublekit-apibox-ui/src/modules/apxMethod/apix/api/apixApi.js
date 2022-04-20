
import {Axios} from "doublekit-core-ui";

export function createApix(data){
    return Axios.post("/apix/createApix",data)
}

export function updateApix(data){
    return Axios.post("/apix/updateApix",data)
}

export function deleteApix(data){
    return Axios.post("/apix/deleteApix",data)
}

export function findApix(data){
    return Axios.post("/apix/findApix",data)
}

export function findApixPage(data){
    return Axios.post("/apix/findApixPage",data)
}
