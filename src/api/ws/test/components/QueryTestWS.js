import React from 'react';
import { observer } from "mobx-react";
import wsStore from "../../ws/store/WSStore";
import ParamTableCommon from "../../../common/ParamTableCommon/ParamTableCommon";

/**
 * 测试页
 * 查询参数
 */
const QueryTestWS = (props) =>{

    const {querySourceList,setQueryList} = wsStore;

    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>查询参数</span></div>
            <ParamTableCommon
                sourceList={querySourceList}
                setList={setQueryList}
                isQuery={true}
            />
        </>
    );
}

export default observer(QueryTestWS);
