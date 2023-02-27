
import {Axios} from "tiklab-core-ui";

export function createFormUrlencoded(data){
    return Axios.post("/formUrlencoded/createFormUrlencoded",data)
}

export function deleteFormUrlencoded(data){
    return Axios.post("/formUrlencoded/deleteFormUrlencoded",data)
}

export function updateFormUrlencoded(data){
    return Axios.post("/formUrlencoded/updateFormUrlencoded",data)
}

export function findFormUrlencoded(data){
    return Axios.post("/formUrlencoded/findFormUrlencoded",data)
}

export function findFormUrlencodedList(data){
    return Axios.post("/formUrlencoded/findFormUrlencodedList",data)
}

