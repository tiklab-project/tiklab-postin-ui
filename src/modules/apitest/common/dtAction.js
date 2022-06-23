import md5 from 'js-md5';
import jsonPath from '../../../common/utils/jsonPath';

let result,
    headerResult,
    paramResult,
    formResult,
    jsonResult,
    rawResult,
    urlData,
    baseUrlData,
    methodData
  = {};

const darth =  {
    md5:md5,
    url:{
        set: (value) => {
            result={...result,url:value}
        },
        get:()=>{
            return urlData
        }
    },
    baseUrl:{
        set: (value) => {
            result={...result,baseUrl:value}
        },
        get:()=>{
            return baseUrlData
        }
    },
    method:{
        set: (value) => {
            result={...result,method:value}
        },
        get:()=>{
            return methodData
        }
    },
    
    header:{
        set: (key, value) => {
            let setValue = {[key]:value}
            result={...result,header:{...setValue}}
        },
        get:(key)=>{
            return headerResult[key]
        }
    },
    param:{
        set: (key, value) => {
            let setValue = {[key]:value}
            result={...result,param:{...setValue}}
        },
        get:(key)=>{
            return paramResult[key]
        }
    },
    body:{
        form:{
            set: (key, value) => {
                let setValue = {[key]:value}
                result={...result,body:{...setValue}}
            },
            get:(key)=>{
                return formResult[key]
            }
        },
        json:{
            set: (key,value) => {
                let setValue = {[key]:value}
                result={...result,body:setValue}
            },
            get:(key)=>{
                let jsonData = jsonPath(jsonResult, `$.${key}`).toString();
                return jsonData;
            }
        },
        raw:{
            set: (value) => {
                result={...result,body:value}
            },
            get:() => {
                return rawResult
            }
        }
    },
    response:{
        set: (value)=>{
            result = {...result,response:value}
        }
    }
}
const handelResult= () => {
    return result
}

const getHeader =(data)=>{
    headerResult = data
}

const getParam =(data)=>{
    paramResult = data
}

const getForm =(data)=>{
    formResult = data
}

const getJson =(data)=>{
    jsonResult = data
}

const getRaw =(data)=>{
    rawResult = data
}

const getUrl=(data)=>{
    urlData = data
}

const getBaseUrl=(data)=>{
    baseUrlData = data
}

const getMethod = (data) => {
    methodData = data
}

function execute(express){
    return eval(express)
}


export { 
    handelResult, 
    getUrl,
    getBaseUrl,
    getMethod,
    getHeader, 
    getParam,
    getForm,
    getJson,
    getRaw,
    execute,
    darth
}