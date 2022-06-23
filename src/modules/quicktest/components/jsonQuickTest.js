import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import JsonTableCommon from "../../common/tableCommon/components/jsonTableCommon";

// 请求参数的可编辑表格组件
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
