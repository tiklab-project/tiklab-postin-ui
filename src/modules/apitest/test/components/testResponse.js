import React from 'react';
import { observer, inject } from "mobx-react";
import TestResponseResBody from "./testResponseResBody";
import TestResponseResHeader from "./testResponseResHeader";
import TestResponseReqHeader from "./testResponseReqHeader";
import TestResponseReqBody from "./testResponseReqBody.js";
import AssertResponseTest from './assertResponseTest';
import TestResultCommon from "../../common/testResultCommon";

import './testResponse.scss'

// 输出参数 请求头部与请求参数的切换
const TestResponse = (props) =>  {
    const { testStore, showResponse } = props;
    const { status, time } = testStore;

    return(
        <TestResultCommon
            status={status}
            time={time}
            showResponse={showResponse}
            responseBody={<TestResponseResBody />}
            responseHeader={<TestResponseResHeader />}
            requestHeader={<TestResponseReqHeader />}
            requestBody={<TestResponseReqBody />}
            assertResult={<AssertResponseTest />}
        />
    )
}

export default inject('testStore')(observer(TestResponse));