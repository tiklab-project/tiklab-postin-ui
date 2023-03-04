import React from 'react'
import { observer, inject } from 'mobx-react'
import RequestBodyCommon from "../../api/http/test/common/RequestBodyCommon";

/**
 * 快捷测试
 * 响应中的请求体
 */
const ResponseReqBodyQuickTest = (props) => {
    const { quickTestStore } = props;
    const { requestBodyData } = quickTestStore;

    return (
        <RequestBodyCommon requestBodyData={requestBodyData}/>
    )
}

export default inject('quickTestStore')(observer(ResponseReqBodyQuickTest));