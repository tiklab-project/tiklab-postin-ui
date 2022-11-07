import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import QueryTableCommon from "../../common/tableCommon/components/queryTableCommon";

// 请求参数的可编辑表格
const QueryQuickTest = (props) =>{
    const { queryQuickTestStore,instanceId } = props;
    const {
        queryQuickTestList,
        saveList,
        deleteList,
        addNewList,
        getQueryParamTestList
    } = queryQuickTestStore;


    useEffect(()=>{
        getQueryParamTestList()
    },[instanceId])

    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>查询参数</span></div>
            <QueryTableCommon
                dataList={queryQuickTestList}
                saveList={saveList}
                addNewList={addNewList}
                deleteList={deleteList}
            />
        </>

    );
}

export default inject('queryQuickTestStore')(observer(QueryQuickTest));
