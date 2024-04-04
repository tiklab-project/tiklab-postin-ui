import React from 'react';
import { observer } from "mobx-react";
import HeaderTableCommon from "../../../common/tableCommon/components/HeaderTableCommon";
import tabQuickTestStore from "../../store/TabQuickTestStore";
/**
 * 快捷测试
 * 请求头
 */
const HeaderQuickTest = (props) =>{
    const {headerList,saveRequestHeaderList,deleteRequestHeaderList} = tabQuickTestStore

    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>请求头参数</span></div>
            <HeaderTableCommon
                dataList={headerList}
                saveList={saveRequestHeaderList}
                deleteList={deleteRequestHeaderList}
            />
        </>
    );
}

export default observer(HeaderQuickTest);