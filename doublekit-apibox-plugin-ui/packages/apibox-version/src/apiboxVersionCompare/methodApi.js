/**
 * @description：
 * @date: 2021-07-26 15:23
 */
import{Axios} from 'doublekit-core-ui';


export function findMethodVersionPage(data){
    return Axios.post("/methodVersion/findMethodVersionPage",data)
}

export function contrastVersion (data){
    return Axios.post("/methodVersion/contrastVersion",data)
}
