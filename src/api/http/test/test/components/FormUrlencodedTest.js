
import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import FormUrlencodedTableCommon from "../../../../../common/tableCommon/components/FormUrlencodedTableCommon";

/**
 * 测试页
 * FormUrlencoded表格
 */
const FormUrlencodedTest = (props) =>{
    const { formUrlencodedTestStore } = props;

    const {
        formUrlencodedTestList,
        saveList,
        deleteList,
        selectKeys,
        selectList
    } = formUrlencodedTestStore;


    return (
        <FormUrlencodedTableCommon
            dataList={formUrlencodedTestList}
            saveList={saveList}
            deleteList={deleteList}
            selectList={selectList}
            selectKeys={selectKeys}
        />
    );
}

export default inject('formUrlencodedTestStore')(observer(FormUrlencodedTest));
