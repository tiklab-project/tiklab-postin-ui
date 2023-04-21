
import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import FormUrlencodedTableCommon from "../../common/tableCommon/components/FormUrlencodedTableCommon";

/**
 * 快捷测试
 * formUrl
 */
const FormUrlencodedQuickTest = (props) =>{
    const { tabQuickTestStore } = props;
    const {
        saveFormUrlList,
        formUrlList,
        deleteFormUrlList,
    } = tabQuickTestStore;


    return (
        <FormUrlencodedTableCommon
            dataList={formUrlList}
            saveList={saveFormUrlList}
            deleteList={deleteFormUrlList}
        />
    );
}

export default inject('tabQuickTestStore')(observer(FormUrlencodedQuickTest));
