
import React, {useCallback, useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import { Space, Table, Empty, Popconfirm} from 'antd';

import emptyImg from "../../../assets/img/empty.png";
import JsonStructureEdit from "./JsonStructureEdit";
import ToggleSchema from "../../../common/jsonSchema/ToggleSchema";
import jsonParamDSStore from "../store/JsonParamDSStore";
import JsonSchemaTable from "../../../common/JsonSchemaTable/JsonSchemaTable";
/**
 * json数据结构
 */
const JsonStructure = (props) => {
    const {
        findJsonParamDS,
        updateJsonParamDS,
    } = jsonParamDSStore;

    const [schema, setSchema] = useState();

    const dataStructureId = localStorage.getItem("dataStructureId")
    useEffect(()=>{
        findJsonParamDS(dataStructureId).then(res=>{
            setSchema(JSON.parse(res.jsonText))
        })

    },[])


    /**
     * jsonschemaTable组件使用的更新
     */
    const jsonSchemaUpdate = useCallback(async (updateValue)=>{
        let param = {
            id: dataStructureId,
            jsonText:JSON.stringify(updateValue)
        }
        await updateJsonParamDS(param)
    },[])


    return (
        <JsonSchemaTable
            schema={schema}
            updateFn={jsonSchemaUpdate}
        />
    );
}


export default observer(JsonStructure);
