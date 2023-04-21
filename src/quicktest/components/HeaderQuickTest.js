import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import HeaderTableCommon from "../../common/tableCommon/components/HeaderTableCommon";

/**
 * 快捷测试
 * 请求头
 */
const HeaderQuickTest = (props) =>{
    const {tabQuickTestStore } = props;
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

export default inject("tabQuickTestStore")(observer(HeaderQuickTest));