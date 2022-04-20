import React from "react";
import Mock from "mockjs";

//用于定义的各个list，转换为对象
export const testFunctionCommon ={
    //数据转换
    transData :(data) =>{
        let newData = {};
        data&&data.map(item=>{
            if(item.paramName!==undefined){
                newData[item.paramName]=Mock.mock(item.value)
            }
        })
        return newData
    },

    //header数据转换
    headerData :(data)=>{
        let headers = {};
        data&&data.map(item=>{
            if(item.headerName!==undefined){
                headers[item.headerName] = Mock.mock(item.value);
            }
        })
        return headers;
    },

    formData:(data)=>{
        const param = new FormData();
        data&&data.map(item => {
            if(item.paramName!==undefined){
                param.append(item.paramName, Mock.mock(item.value));
            }
        })
        return param
    },

    jsonData:(data) => {
        let jsonResult =  {};
        data&&data.map(item => {
            if(item.paramName!==undefined){
                jsonResult[item.paramName] = Mock.mock(item.value);
            }
            if(item.children && item.children.length> 0) {
                loop( item.children, item.paramName, jsonResult );
            }
        })
    }

}

//json 递归
const loop = (bodys, key, result)=>{
    let obj = {}
    return bodys.forEach(item => {
        if(item.paramName!==undefined){
            obj[item.paramName] = Mock.mock(item.value);
        }
        if(item.children && item.children.length> 0) {
            loop( item.children, item.paramName, obj );
        }
        result[key] = obj;
        return result;
    })
};

//保存用例公共方法
export const saveTestcaseCommon ={
    filterData:(data)=>{
        data&&data.filter(item=>{
            let itemKeys = Object.keys(item);
            return !(itemKeys.length === 1 && itemKeys[0] === "id")
        })
    }

}

