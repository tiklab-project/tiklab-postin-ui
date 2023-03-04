import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import AssertTableCommon from "../../../../../common/tableCommon/components/AssertTableCommon";

/**
 * 测试页
 * 断言表格
 */
const AssertParamTest = (props) =>{
    const { assertParamTestStore } = props;
    const {
        getAssertTestList,
        assertParamTestList,
        saveList,
        addNewList,
        deleteList,
    } = assertParamTestStore;

    useEffect(()=>{
        getAssertTestList()
    },[])

    return (
        <AssertTableCommon
            dataList={assertParamTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
        />

    ); 
}


export default inject('assertParamTestStore')(observer(AssertParamTest));