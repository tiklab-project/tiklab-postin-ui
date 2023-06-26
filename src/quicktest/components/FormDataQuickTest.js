import React from 'react';
import { observer, inject } from "mobx-react";
import FormDataTableCommon from "../../common/tableCommon/components/FormDataTableCommon";
import tabQuickTestStore from "../store/TabQuickTestStore";
/**
 * 快捷测试
 * formdata
 */
const FormDataQuickTest = (props) =>{
    const {
        formList,
        saveFormList,
        deleteFormList,
    } = tabQuickTestStore;

    return (
        <FormDataTableCommon
            dataList={formList}
            saveList={saveFormList}
            deleteList={deleteFormList}
        />
    );
}

export default observer(FormDataQuickTest);
