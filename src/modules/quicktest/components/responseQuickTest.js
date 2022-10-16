import React from "react";
import {inject, observer} from "mobx-react";
import TestResultCommon from "../../apitest/common/testResultCommon";
import ResponseBodyQuickTest from "./responseBodyQuickTest";
import ResponseHeaderQuickTest from "./responseHeaderQuickTest";
import ResponseReqHeaderQuickTest from "./responseReqHeaderQuickTest";
import ResponseReqBodyQuickTest from "./responseReqBodyQuickTest";
import ResponseAssertQuickTest from "./responseAssertQuickTest";


// 输出参数 请求头部与请求参数的切换
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