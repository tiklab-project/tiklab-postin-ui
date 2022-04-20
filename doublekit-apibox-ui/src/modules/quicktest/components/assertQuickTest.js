import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import AssertTableCommon from "../../common/tableCommon/components/assertTableCommon";

// 请求参数的可编辑表格
const AssertQuickTest = (props) =>{
    const { assertQuickTestStore } = props;
    const {
        getAssertTestList,
        assertQuickTestList,
        saveList,
        addNewList,
        deleteList,
    } = assertQuickTestStore;

    useEffect(()=>{
        getAssertTestList()
    },[])

    return (
        <AssertTableCommon
            dataList={assertQuickTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
        />

    );
}

export default inject('assertQuickTestStore')(observer(AssertQuickTest));