/*
 * @Description: 空间接口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-25 14:28:21
 */

import { Axios } from "doublekit-core-ui";

export function importPostman(data){
    return Axios.post("/port/importPostman",data)
}

export function importReport(data){
    return Axios.post("/port/importReport",data)
}
