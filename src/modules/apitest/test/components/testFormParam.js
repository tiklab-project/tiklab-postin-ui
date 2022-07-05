import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import FormDataTableCommon from "../../../common/tableCommon/components/formDataTableCommon";

// 请求参数的可编辑表格
const FormParamTest = (props) =>{
    const { formParamTestStore, bodyType } = props;
    
    const {
        getFormParamTestList,
        formParamTestList,
        saveList,
        addNewList,
        deleteList,
    } = formParamTestStore;

    return (
        <FormDataTableCommon
            dataList={formParamTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
            getFormDataList={getFormParamTestList}
            bodyType={bodyType}
        />
    );
}

export default inject('formParamTestStore')(observer(FormParamTest));
