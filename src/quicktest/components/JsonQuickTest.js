import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import JsonTableCommon from "../../common/tableCommon/components/JsonTableCommon";

/**
 * 快捷测试
 * json
 */
const JsonQuickTest= (props) => {
    const { jsonQuickTestStore, bodyType } = props;

    const {
        getJsonParamTestList,
        jsonQuickTestList,
        saveList,
        addNewList,
        deleteList,
        setJsonParamListChild,
    } = jsonQuickTestStore;

    useEffect(()=>{
        getJsonParamTestList()
    },[])

    return (
        <JsonTableCommon
            getJsonList={getJsonParamTestList}
            dataList={jsonQuickTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
            bodyType={bodyType}
            setJsonChild={setJsonParamListChild}
        />
    );
}

export default inject( 'jsonQuickTestStore')(observer(JsonQuickTest));
