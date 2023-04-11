import React from 'react';
import { observer, inject } from "mobx-react";
import QueryTableCommon from "../../../../../common/tableCommon/components/QueryTableCommon";

/**
 * 测试页
 * 查询参数
 */
const QueryParam = (props) =>{
    const { queryParamTestStore } = props;
    const {
        queryParamTestList,
        saveList,
        deleteList,
        selectKeys,
        selectList
    } = queryParamTestStore;
  
    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>查询参数</span></div>
            <QueryTableCommon
                dataList={queryParamTestList}
                saveList={saveList}
                deleteList={deleteList}
                selectList={selectList}
                selectKeys={selectKeys}
            />
        </>

    ); 
}

export default inject('queryParamTestStore')(observer(QueryParam));