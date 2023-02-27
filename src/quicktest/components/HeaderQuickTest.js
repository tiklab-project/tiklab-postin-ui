import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";

// 请求参数的可编辑表格
import HeaderTableCommon from "../../common/tableCommon/components/HeaderTableCommon";

const HeaderQuickTest = (props) =>{
    const { headerQuickTestStore,instanceId } = props;

    const {
        saveList,
        addNewList,
        deleteList,
        headerQuickTestList,
        getRequestHeaderTestList
    } = headerQuickTestStore;

    useEffect(()=>{
        getRequestHeaderTestList()
    },[instanceId])

    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>请求头参数</span></div>
            <HeaderTableCommon
                dataList={headerQuickTestList}
                saveList={saveList}
                addNewList={addNewList}
                deleteList={deleteList}
            />
        </>

    );
}

export default inject('headerQuickTestStore')(observer(HeaderQuickTest));