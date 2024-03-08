import React from "react";
import Mock from "mockjs";
import querystring from "querystring"

//用于定义的各个list，转换为对象
export const testFunctionCommon ={
    //数据转换  data格式 []
    transData :(data) =>{
        if(!data) return null;

        let newData = {};
        data.forEach(({paramName, value})=>{
            if(paramName!==undefined){
                newData[paramName]=Mock.mock(value)
            }
        })
        return Object.keys(newData).length > 0 ? newData : null;
    },

    //header数据转换 data格式 []
    headerData :(data) => {
        if(!data) return {};

        let headers = {};
        data.forEach(({headerName, value}) => {
            if(headerName) {
                headers[headerName] = Mock.mock(value);
            }
        });

        return Object.keys(headers).length > 0 ? headers : {};
    },

    //特殊：data格式 {}
    formData:(data)=>{
        const param = new FormData();
        for (const key of Object.keys(data)) {
            param.append(key, data[key]);
        }
        return param
    },

    assertData:(data) =>{
        if(!data) return null;

        let newData = {};
        data.forEach((item)=>{
            let {source,propertyName,comparator,value} = item
            if(source!==undefined){
                newData[source]=value
            }
        })
        return Object.keys(newData).length > 0 ? newData : null;
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


/**
 * jsonSchema转换成json
 */
export const jsonSchemaToJson = (schema) =>{
    const result = {};

    for (const key in schema.properties) {
        const property = schema.properties[key];

        if (property.type === 'object') {
            result[key] = jsonSchemaToJson(property);
        } else {
            if(property.mock){
                result[key] = property.mock.mock;
            }else {

                result[key] = "@"+property.type
            }
        }
    }

    return result;
}


const treeData = [
    {
        id: '1',
        name: 'Node 1',
        type: 'category', // 目录类型
        children: [
            { id: '1-1', name: 'Node 1-1', type: 'http', methodType:"post" },
            { id: '1-2', name: 'Node 1-2', type: 'http', methodType:"post" },
            { id: '1-3', name: 'Node 1-3', type: 'ws'},
            { id: '1-4', name: 'Node 1-4', type: 'ws'},
        ],
    },
    {
        id: '2',
        name: 'Node 2',
        type: 'category', // 目录类型
        children: [
            {
                id: '2-1',
                title: 'Node 2-1',
                type: 'category', // 目录类型
                children: [
                    { id: '2-1-1', name: 'Node 2-1-1', type: 'http', methodType:"get" },
                    { id: '2-1-2', name: 'Node 1-2', type: 'http', methodType:"post" },
                ],
            },
            { id: '2-2', name: 'Node 2-2', type: 'ws'},
            { id: '2-3', name: 'Node 2-3', type: 'http', methodType:"get" },
        ],
    },
];


