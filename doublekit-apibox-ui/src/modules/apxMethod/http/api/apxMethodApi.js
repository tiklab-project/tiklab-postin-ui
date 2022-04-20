/*
 * @Description: http接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:36:16
 */


import {Axios} from "doublekit-core-ui";

export function createMethod(data){
    return Axios.post("/http/createHttpApi",data)
}

export function updateMethod(data){
    return Axios.post("/http/updateHttpApi",data)
}

export function deleteMethod(data){
    return Axios.post("/http/deleteHttpApi",data)
}

export function findMethod(data){
    return Axios.post("/http/findHttpApi",data)
}

export function findMethodPage(data){
    return Axios.post("/http/findHttpApiPage",data)
}

//
// export function createVersion(data){
//     return Axios.post("/httpVersion/createVersion",data)
// }
//
// export function findMethodVersionPage(data){
//     return Axios.post("/httpVersion/findMethodVersionPage",data)
// }
//
// export function contrastVersion (data){
//     return Axios.post("/httpVersion/contrastVersion",data)
// }
//
// export function queryVersionDetail (data){
//     return Axios.post("/httpVersion/queryVersiondetail",data)
// }
