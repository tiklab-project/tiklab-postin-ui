import React from "react";
import {inject, observer} from "mobx-react";
import TestResultCommon from "../../api/http/test/common/TestResultCommon";
import ResponseBodyQuickTest from "./ResponseBodyQuickTest";
import ResponseHeaderQuickTest from "./ResponseHeaderQuickTest";
import ResponseReqHeaderQuickTest from "./ResponseReqHeaderQuickTest";
import ResponseReqBodyQuickTest from "./ResponseReqBodyQuickTest";
import ResponseAssertQuickTest from "./ResponseAssertQuickTest";

/**
 * 快捷测试
 * 响应
 */
const ResponseQuickTest = (props) =>  {
    const { quickTestStore, showResponse,errorMsg } = props;
    const { status, time, size } = quickTestStore;

    return(
        <TestResultCommon
            status={status}
            time={time}
            size={size}
            showResponse={showResponse}
            error={errorMsg}
            responseBody={<ResponseBodyQuickTest />}
            responseHeader={<ResponseHeaderQuickTest />}
            requestHeader={<ResponseReqHeaderQuickTest />}
            requestBody={<ResponseReqBodyQuickTest />}
            assertResult={<ResponseAssertQuickTest />}
        />
    )
}

export default inject('quickTestStore')(observer(ResponseQuickTest))