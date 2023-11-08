import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import AssertTableCommon from "../../../common/tableCommon/components/AssertTableCommon";
import tabQuickTestStore from "../../store/TabQuickTestStore";
/**
 * 快捷测试
 * 断言
 */
const AssertQuickTest = (props) =>{
    const {deleteAssertList,saveAssertList,assertList} = tabQuickTestStore;

    return (
        <AssertTableCommon
            dataList={assertList}
            saveList={saveAssertList}
            deleteList={deleteAssertList}
        />
    );
}

export default observer(AssertQuickTest);