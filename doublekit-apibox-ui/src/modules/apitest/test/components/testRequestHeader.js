import React from 'react';
import { observer, inject } from "mobx-react";
import HeaderTableCommon from "../../../common/tableCommon/components/headerTableCommon";

// 请求参数的可编辑表格
const RequestHeader = (props) =>{
    const { requestHeaderTestStore } = props;

    const {
        saveList,
        addNewList,
        deleteList,
        requestHeaderTestList,
    } = requestHeaderTestStore;

    return (
        <HeaderTableCommon
            dataList={requestHeaderTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
        />
    );
}

export default inject('requestHeaderTestStore')(observer(RequestHeader));
