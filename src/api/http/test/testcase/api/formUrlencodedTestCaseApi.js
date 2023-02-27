
import {Axios} from "tiklab-core-ui";

export function createFormUrlencodedTestCase(data){
    return Axios.post("/formUrlencodedCase/createFormUrlencodedCase",data)
}

export function deleteFormUrlencodedTestCase(data){
    return Axios.post("/formUrlencodedCase/deleteFormUrlencodedCase",data)
}

export function updateFormUrlencodedTestCase(data){
    return Axios.post("/formUrlencodedCase/updateFormUrlencodedCase",data)
}

export function findFormUrlencodedTestCase(data){
    return Axios.post("/formUrlencodedCase/findFormUrlencodedCase",data)
}

export function findFormUrlencodedTestCaseList(data){
    return Axios.post("/formUrlencodedCase/findFormUrlencodedCaseList",data)
}

