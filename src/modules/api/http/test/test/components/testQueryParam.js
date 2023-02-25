import React from 'react';
import { observer, inject } from "mobx-react";
import QueryTableCommon from "../../../../../common/tableCommon/components/queryTableCommon";

// 请求参数的可编辑表格
const QueryParam = (props) =>{
    const { queryParamTestStore } = props;
    const {
        queryParamTestList,
        saveList,
        deleteList,
        addNewList,
    } = queryParamTestStore;
  
    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>查询参数</span></div>
            <QueryTableCommon
                dataList={queryParamTestList}
                saveList={saveList}
                addNewList={addNewList}
                deleteList={deleteList}
            />
        </>

    ); 
}

export default inject('queryParamTestStore')(observer(QueryParam));
