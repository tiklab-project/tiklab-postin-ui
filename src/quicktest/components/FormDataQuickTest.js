import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import FormDataTableCommon from "../../common/tableCommon/components/FormDataTableCommon";

/**
 * 快捷测试
 * formdata
 */
const FormDataQuickTest = (props) =>{
    const { tabQuickTestStore } = props;
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

export default inject('tabQuickTestStore')(observer(FormDataQuickTest));
