
import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import FormUrlencodedTableCommon from "../../common/tableCommon/components/formUrlencodedTableCommon";

const FormUrlencodedQuickTest = (props) =>{
    const { formUrlencodedQuickTestStore, bodyType } = props;

    const {
        getFormUrlencodedTestList,
        formUrlencodedQuickTestList,
        saveList,
        addNewList,
        deleteList,
    } = formUrlencodedQuickTestStore;

    useEffect(()=>{
        getFormUrlencodedTestList()
    },[])

    return (
        <FormUrlencodedTableCommon
            dataList={formUrlencodedQuickTestList}
            saveList={saveList}
            addNewList={addNewList}
            deleteList={deleteList}
            getFormUrlencodedList={getFormUrlencodedTestList}
            bodyType={bodyType}
        />
    );
}

export default inject('formUrlencodedQuickTestStore')(observer(FormUrlencodedQuickTest));
