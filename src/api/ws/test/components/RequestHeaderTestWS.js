import React from 'react';
import { observer } from "mobx-react";
import wsStore from "../../ws/store/WSStore";
import ParamTableCommon from "../../../common/ParamTableCommon/ParamTableCommon";

/**
 * 测试页
 * 请求头
 */
const RequestHeaderTestWS = (props) =>{

    const {headerSourceList,setHeaderList} = wsStore;

    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>请求头参数</span></div>
            <ParamTableCommon
                sourceList={headerSourceList}
                setList={setHeaderList}
            />
        </>
    );
}

export default observer(RequestHeaderTestWS);
