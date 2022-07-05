/*
 * @Description:  请求参数中From可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:47:43
 */

import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import FormUrlencodedTableCommon from "../../../common/tableCommon/components/formUrlencodedTableCommon";

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
