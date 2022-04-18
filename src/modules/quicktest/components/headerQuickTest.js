import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";

// 请求参数的可编辑表格
import HeaderTableCommon from "../../common/tableCommon/components/headerTableCommon";

const HeaderQuickTest = (props) =>{
    const { headerQuickTestStore } = props;

    const {
        saveList,
        addNewList,
        deleteList,
        headerQuickTestList,
        getRequestHeaderTestList
    } = headerQuickTestStore;

    useEffect(()=>{
        getRequestHeaderTestList()
    },[])

    return (
        <HeaderTableCommon
            dataList={headerQuickTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
        />
    );
}

export default inject('headerQuickTestStore')(observer(HeaderQuickTest));