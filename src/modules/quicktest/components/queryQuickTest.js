import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import QueryTableCommon from "../../common/tableCommon/components/queryTableCommon";

// 请求参数的可编辑表格
const QueryQuickTest = (props) =>{
    const { queryQuickTestStore } = props;
    const {
        queryQuickTestList,
        saveList,
        deleteList,
        addNewList,
        getQueryParamTestList
    } = queryQuickTestStore;


    useEffect(()=>{
        getQueryParamTestList()
    },[])

    return (
        <QueryTableCommon
            dataList={queryQuickTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
        />
    );
}

export default inject('queryQuickTestStore')(observer(QueryQuickTest));
