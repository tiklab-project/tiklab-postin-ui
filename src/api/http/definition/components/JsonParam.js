
import React, { useEffect } from 'react';
import { observer } from "mobx-react";

import ToggleSchema from "../../../../common/jsonSchema/ToggleSchema";
import jsonParamStore from "../store/JsonParamStore";
/**
 * 废弃
 * @Description: 请求参数中Json的可编辑表格组件
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:56:56
 */
const JsonParam = (props) => {
    const {
        findJsonParam,
        createJsonParam,
        updateJsonParam,
        schemaData,
        setSchemaData
    } = jsonParamStore;


    const httpId = localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findJsonParam(httpId).then(res=>{
            if(res&&res.jsonText){
                setSchemaData(JSON.parse(res.jsonText))
            }else {
                let data = {
                    httpId: httpId,
                    id:httpId,
                    jsonText:"{\"type\":\"object\",\"title\":\"title\",\"properties\":{}}"
                }
                createJsonParam(data).then(()=>{
                    findJsonParam(httpId).then(res=>{
                        setSchemaData(JSON.parse(res.jsonText))
                    })
                })
            }

        });
    },[])

    return (
        <ToggleSchema
            data={schemaData}
            schemaData={schemaData}
            setSchemaData={setSchemaData}
            deep={0}
            parent={schemaData}
            root={true}
            updateFn={updateJsonParam}
            httpId={httpId}
            resultId={httpId}
        />
    );
}


export default observer(JsonParam);
