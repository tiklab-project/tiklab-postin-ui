
import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import FormUrlencodedTableCommon from "../../../../../common/tableCommon/components/FormUrlencodedTableCommon";

/**
 * 测试页
 * FormUrlencoded表格
 */
const FormUrlencodedTest = (props) =>{
    const { formUrlencodedTestStore, bodyType } = props;

    const {
        getFormUrlencodedTestList,
        formUrlencodedTestList,
        saveList,
        addNewList,
        deleteList,
    } = formUrlencodedTestStore;

    // useEffect(()=>{
    //     getFormUrlencodedTestList()
    // },[bodyType])

    return (
        <FormUrlencodedTableCommon
            dataList={formUrlencodedTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
        />
    );
}

export default inject('formUrlencodedTestStore')(observer(FormUrlencodedTest));
