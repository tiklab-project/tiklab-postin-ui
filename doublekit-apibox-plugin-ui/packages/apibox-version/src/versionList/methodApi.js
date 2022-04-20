/**
 * @description：
 * @date: 2021-07-23 15:16
 */
import{Axios} from 'doublekit-core-ui';


export function findMethodVersionPage(data){
    return Axios.post("/methodVersion/findMethodVersionPage",data)
}

export function deleteMethod(data){
    return Axios.post("/method/deleteMethod",data)
}
