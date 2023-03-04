import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import JsonTableCommon from "../../../../../common/tableCommon/components/JsonTableCommon";

/**
 * 测试页
 * json
 */
const JsonParamTest = (props) => {
    const { jsonParamTestStore, bodyType } = props;

    const {
        getJsonParamTestList,
        jsonParamTestList,
        saveList,
        addNewList,
        deleteList,
        setJsonParamListChild,
    } = jsonParamTestStore;

    // useEffect(()=>{
    //     getJsonParamTestList()
    // },[bodyType])

    return (
        <JsonTableCommon
            dataList={jsonParamTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
            setJsonChild={setJsonParamListChild}
        />
    );
}

export default inject('jsonParamTestStore')(observer(JsonParamTest));
