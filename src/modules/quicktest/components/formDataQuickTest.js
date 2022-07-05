import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import FormDataTableCommon from "../../common/tableCommon/components/formDataTableCommon";

// 请求参数的可编辑表格
const FormDataQuickTest = (props) =>{
    const { formDataQuickTestStore, bodyType,instanceId } = props;

    const {
        getFormParamTestList,
        formQuickTestList,
        saveList,
        addNewList,
        deleteList,
    } = formDataQuickTestStore;

    useEffect(()=>{
        getFormParamTestList()
    },[instanceId])

    return (
        <FormDataTableCommon
            dataList={formQuickTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
            getFormDataList={getFormParamTestList}
            bodyType={bodyType}
        />
    );
}

export default inject('formDataQuickTestStore')(observer(FormDataQuickTest));
