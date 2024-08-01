
import React, {useCallback, useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";

import jsonParamDSStore from "../store/JsonParamDSStore";
import JsonSchemaTable from "../../../common/JsonSchemaTable/JsonSchemaTable";
/**
 * json数据结构
 */
const JsonStructure = (props) => {
    const {
        findJsonParamDS,
        updateJsonParamDS,
        jsonText
    } = jsonParamDSStore;

    const [schema, setSchema] = useState();

    const dataStructureId = localStorage.getItem("dataStructureId")
    useEffect(()=>{
        findJsonParamDS(dataStructureId).then(res=>{
            setSchema(JSON.parse(res.jsonText))
        })
    },[jsonText])


    /**
     * jsonschemaTable组件使用的更新
     */
    const jsonSchemaUpdate = async (updateValue)=>{
        let param = {
            id: dataStructureId,
            jsonText:JSON.stringify(updateValue)
        }
        await updateJsonParamDS(param)
    }


    return (
        <div className={"tabPane-item-box"}>
            <JsonSchemaTable
                schema={schema}
                updateFn={jsonSchemaUpdate}
            />
        </div>
    );
}


export default observer(JsonStructure);
