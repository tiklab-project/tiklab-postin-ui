import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import QueryTableCommon from "../../common/tableCommon/components/QueryTableCommon";
import tabQuickTestStore from "../store/TabQuickTestStore";
/**
 * 快捷测试
 * 查询参数
 */
const QueryQuickTest = (props) =>{
    const {
        queryList,
        saveQueryList,
        deleteQueryList,
    } = tabQuickTestStore;


    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>查询参数</span></div>
            <QueryTableCommon
                dataList={queryList}
                saveList={saveQueryList}
                deleteList={deleteQueryList}
            />
        </>

    );
}

export default observer(QueryQuickTest);
