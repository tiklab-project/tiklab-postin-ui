import md5 from 'js-md5';
import jsonPath from '../../../common/utils/jsonPath';

let response,
    headers,
    querys,
    forms,
    urlencodeds,
    json
  = {};

export const darth =  {
    md5:md5,

    header:{
        set: (key, value) => {
            let setValue = {[key]:value}
            return  {...headers,...setValue}
        },
        get:(key)=>{
            return headers[key]
        },
    },

    query:{
        set: (key, value) => {
            let setValue = {[key]:value}
            querys={...querys,...setValue}
        },
        get:(key)=>{
            return querys[key]
        }
    },

    body:{
        form:{
            set: (key, value) => {
                let setValue = {[key]:value}
                forms={...forms,...setValue}
            },
            get:(key)=>{
                return forms[key]
            }
        },
        urlencoded:{
            set: (key, value) => {
                let setValue = {[key]:value}
                urlencodeds={...urlencodeds,...setValue}
            },
            get:(key)=>{
                return urlencodeds[key]
            }
        },
        json:{
            set: (key,value) => {
                let setValue = {[key]:value}
                json={...json,...setValue}
            },
            get:(key)=>{
                return jsonPath(json, `$.${key}`).toString();
            }
        },
    },

    response:{
        set: (value)=>{
            response = {...response,response:value}
        }
    }
}

export const getHeader =(data)=>{
    headers = data
}

export const getQuery =(data)=>{
    querys = data
}

export const getForm =(data)=>{
    forms = data
}

export const getUrlencoded =(data)=>{
    urlencodeds = data
}

export const getJson =(data)=>{
    json = data
}


export const execute=(express)=>{
    return eval(express)
}