/**
 * @description：
 * @date: 2021-07-23 15:16
 */
import{Axios} from 'doublekit-core-ui';


export function queryVersionDetail (data){
    return Axios.post("/methodVersion/queryVersiondetail",data)
}

export function findMethodVersionPage(data){
    return Axios.post("/methodVersion/findMethodVersionPage",data)
}

