import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import FormDataTableCommon from "../../../../../common/tableCommon/components/FormDataTableCommon";

/**
 * 测试页
 * formdata
 */
const FormParamTest = (props) =>{
    const { formParamTestStore } = props;
    
    const {
        formParamTestList,
        saveList,
        deleteList,
        selectKeys,
        selectList
    } = formParamTestStore;

    return (
        <FormDataTableCommon
            dataList={formParamTestList}
            saveList={saveList}
            deleteList={deleteList}
            selectList={selectList}
            selectKeys={selectKeys}
        />
    );
}

export default inject('formParamTestStore')(observer(FormParamTest));