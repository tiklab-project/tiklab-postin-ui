import React from "react";
import Mock from "mockjs";

//用于定义的各个list，转换为对象
export const testFunctionCommon ={
    //数据转换  data格式 []
    transData :(data) =>{
        if(!data) return null;

        let newData = {};
        data?.forEach(({paramName, value})=>{
            if(paramName!==undefined){
                newData[paramName]=Mock.mock(value)
            }
        })
        return Object.keys(newData).length > 0 ? newData : null;
    },

    //header数据转换 data格式 []
    headerData :(data) => {
        if(!data) return null;

        let headers = {};

        data?.forEach(({headerName, value}) => {
            if(headerName) {
                headers[headerName] = Mock.mock(value);
            }
        });

        return Object.keys(headers).length > 0 ? headers : null;
    },

    //特殊：data格式 {}
    formData:(data)=>{
        const param = new FormData();
        for (const key of Object.keys(data)) {
            param.append(key, data[key]);
        }
        return param
    },

}



//保存用例公共方法
export const saveTestcaseCommon ={
    filterData:(data)=>{
        data&&data.filter(item=>{
            let itemKeys = Object.keys(item);
            return !(itemKeys.length === 1 && itemKeys[0] === "id")
        })
    }
}



