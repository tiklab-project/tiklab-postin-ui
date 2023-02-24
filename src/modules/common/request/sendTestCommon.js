
import {testFunctionCommon} from "../../apitest/common/testFunctionCommon";
import qs from "qs";
import {
    bodyTypeJsonDictionary as bodyTypeJson,
    rawTypeJsonDictionary as rawTypeJson
} from "../dictionary/dictionary";
import {getHeader, getQuery} from "../../apitest/common/dtAction";
import axiosIns from "../../../common/utils/localrequest";


//发送测试 数据处理
export const sendTestDataProcess=(data,preParamTestInfo)=>{

    //header
    let header = testFunctionCommon.headerData(data.headerList);

    //前置：获取header进行操作
    getHeader(header);

    // let headers =  darth.header.set("accept","123")


    //query
    let params = testFunctionCommon.transData(data.queryList);

    //前置：获取header进行操作
    getQuery(params);

    //body
    let bodys = bodySwitch(data,header)

    //前置
    // if(preParamTestInfo){
    //     execute(preParamTestInfo?.scriptex)
    // }

    //请求参数
    return {
        "method": data.method,
        "url": data.baseUrl ? data.baseUrl + data.path : data.path,
        "headers": header,
        "params": params,
        "bodys": bodys,
    };

}


//发送测试
export const sendTest=async (data)=>{

    // 请求前的毫秒数
    let sendDate = (new Date()).getTime();

    let res = await axiosIns({
        method: data.method,
        url: data.url,
        data: data.bodys,
        params: data.params,
        headers: data.headers,
    }).then(res=>{

        let receiveDate = (new Date()).getTime();
        //time, ms
        let responseTimeMs = receiveDate - sendDate;

        console.log(res)
        return {
            time:responseTimeMs,
            res:res
        }
    }).catch(error=>{
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            let receiveDate = (new Date()).getTime();
            let responseTimeMs = receiveDate - sendDate;

            return  {
                time:responseTimeMs,
                res:error.response
            }
        } else {
            // network Error
            console.log('Error', error.message);

            return {error:error.message}
        }
    })

    return res
}



const processResponse = (res) =>{

    let resDate={};


    if(Object.keys(res.headers).length>0){
        let headerStr = res.headers["pi-header"]

        let headerObj={};
        const regex = /(\w+):\[(\w+)\]/g;
        let match;
        while ((match = regex.exec(headerStr)) !== null) {
            const key = match[1];
            const value = match[2];
            headerObj[key] = value;
        }



        //解析 基础信息 statusCode,statusText,times
        let base = res.headers["pi-base"]
        const obj = base.split(",").reduce((acc, cur) => {
            const [key, value] = cur.split("=");
            acc[key] = isNaN(value) ? value : Number(value);
            return acc;
        }, {});


        resDate.time=obj.time;
        res.headers=headerObj

    }


    resDate.res=res


    return resDate
}



//Proxy send test

//发送测试
export const localProxySendTest=async (proxyPath,data)=>{
    //request接口 请求头
    let fetchHeaders;

    //当前执行的请求的接口参数
    let body = data.bodys
    let header = data.headers
    let queryHeader;
    if(data.method!=="get"){
        queryHeader=Object.assign({}, {"User-Agent":"PostIn/1.0.0"},{"content-type": header["Content-Type"]})
        fetchHeaders={"content-type": header["Content-Type"]}
    }else {
        queryHeader={"User-Agent":"PostIn/1.0.0"}
    }


    //处理后的查询参数
    let fetchHeader =processPiHeader(queryHeader,data)

    //request接口 请求地址
    let fetchUrl = `/request?${fetchHeader}`;
    // try{
    //     if(base_url){
    //         fetchUrl = `${base_url}/request?${fetchHeader}`
    //     }else {
    //         fetchUrl = `http://192.168.10.18:8080/request?${fetchHeader}`
    //     }
    // }catch {
    //     fetchUrl = `http://192.168.10.18:8080/request?${fetchHeader}`
    // }

    // 请求前的毫秒数
    let sendDate = (new Date()).getTime();
    //请求
   let res =  axiosIns.post(fetchUrl,body,{ headers:fetchHeaders}).then(res=>{

       let resDate={};

       if(Object.keys(res.headers).length>0){
           let headerStr = res.headers["pi-header"]


           const headerObj = {};
           // headerStr=headerStr.substring(1, headerStr.length - 1);
           // headerStr.replace(/\[(.*?)\]/g, function(_, val) {
           //     const parts = val.split(':');
           //     headerObj[parts[0].trim()] = parts[1].trim();
           // });


           //解析 基础信息 statusCode,statusText,times
           let base = res.headers["pi-base"]
           const obj = base.split(",").reduce((acc, cur) => {
               const [key, value] = cur.split("=");
               acc[key] = isNaN(value) ? value : Number(value);
               return acc;
           }, {});


           resDate.time=obj.time;
           // res.headers=headerObj

       }


       resDate.res=res

       console.log(resDate)
       return resDate

    }).catch(error=>{
        console.log(error.message)
    })

    return res
}


//把当前请求的接口基础信息放到query参数里请求，转换成query字符参数?a=b&c=d
const processPiHeader = (queryHeader,data) =>{
    //头部
    let queryHeaderStr = Object.entries(queryHeader).map(([key, value]) => `${key}:${value}`).join(",");

    let queryHeaderObj=  {"pi-header":queryHeaderStr,"pi-url":data.url,"pi-method":data.method}

    let fetchHeader = Object.keys(queryHeaderObj).map(key => key + '=' + queryHeaderObj[key]).join('&');

    return fetchHeader;
}





//获取相应的请求体数据
const bodySwitch = (data,headers) =>{

    switch (data.bodyType) {
        case bodyTypeJson.none:
            return null;
        case bodyTypeJson.formdata:
            return formData(data.formDataList,headers);
        case bodyTypeJson.formUrlencoded:
            return formUrlencoded(data.formUrlencodedList,headers)
        case bodyTypeJson.json:
            return json(data.jsonList,headers)
        case bodyTypeJson.raw:
            return rawSwitch(data.rawParam,headers)
        // case "binary":

    }
}

//获取formdata数据
const formData = (data,headers)=>{
    headers['Content-Type']='multipart/form-data';
    return testFunctionCommon.formData(data)
}

//获取formUrlencoded数据
const formUrlencoded = (data,headers) =>{
    headers['Content-Type']='application/x-www-form-urlencoded';
    let formUrlencoded =testFunctionCommon.transData(data);

    return qs.stringify(formUrlencoded);
}

//获取json数据
const json = (data,headers) =>{
    headers['Content-Type']='application/json';
    return testFunctionCommon.jsonData(data)
}

//获取相应的raw数据
const rawSwitch = (data,headers) =>{
    switch (data&&data.type){
        case rawTypeJson.text:
            headers['Content-Type']='text/plain';
            return data.raw;
        case rawTypeJson.json:
            headers['Content-Type']='application/json';
            return data.raw;
        case rawTypeJson.javascript:
            headers['Content-Type']='application/javascript';
            return data.raw;
        case rawTypeJson.xml:
            headers['Content-Type']='text/xml';
            return data.raw;
        case rawTypeJson.html:
            headers['Content-Type']='text/html';
            return data.raw;
    }
}


