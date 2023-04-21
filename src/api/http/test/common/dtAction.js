import md5 from 'js-md5';
import jsonPath from '../../../../common/utils/jsonPath';

let response,
    headers,
    querys,
    forms,
    urlencodeds,
    json
  = {};

let preObj = {}
let resData


const pi =  {
    md5:md5,

    header:{
        set: (key, value) => {
            let header = {[key]: value}
            preObj.header=header
            return preObj
        }
    },

    query:{
        set: (key, value) => {
            let query = {[key]: value}
            preObj.query=query
            return preObj
        }
    },

    body:{
        form:{
            set: (key, value) => {
                let form = {[key]: value}
                preObj.query=form
                return preObj
            }
        },
        urlencoded:{
            set: (key, value) => {
                let formUrl = {[key]: value}
                preObj.formUrl=formUrl
                return preObj
            }
        },
        // json:{
        //     set: (key,value) => {
        //         let setValue = {[key]:value}
        //         json={...json,...setValue}
        //     },
        //     get:(key)=>{
        //         return jsonPath(json, `$.${key}`).toString();
        //     }
        // },
    },

    response:{
        get: ()=>{
            return  resData
        },
        getStatusCode: ()=>{
            return  resData.res.status
        }
    }
}

// export const getHeader =(data)=>{
//     headers = data
// }
//
// export const getQuery =(data)=>{
//     querys = data
// }
//
// export const getForm =(data)=>{
//     forms = data
// }
//
// export const getUrlencoded =(data)=>{
//     urlencodeds = data
// }
//
// export const getJson =(data)=>{
//     json = data
// }


export const execute=(express,responseData)=>{
    resData=responseData?responseData:{}
    return eval(express)
}