import React from "react";
import { observer, inject } from "mobx-react";
import TestResultCommon from "../../common/TestResultCommon";
import TestResultResponseBodyCase from "./TestResultResponseBodyCase";
import TestResultResponseHeaderCase from "./TestResultResponseHeaderCase";
import TestResultRequestHeaderCase from "./TestResultRequestHeaderCase";
import TestResultRequestBodyCase from "./TestResultRequestBodyCase";
import AssertResponseTestCase from "./AssertResponseTestCase";

const TestResultCase = (props) => {
    const { testCaseStore, showResponse } = props;
    const { status, time, size, error} = testCaseStore;
    
    return(
        <TestResultCommon
            status={status}
            time={time}
            size={size}
            showResponse={showResponse}
            error={error}
            responseBody={<TestResultResponseBodyCase />}
            responseHeader={<TestResultResponseHeaderCase />}
            requestHeader={<TestResultRequestHeaderCase />}
            requestBody={<TestResultRequestBodyCase />}
            assertResult={<AssertResponseTestCase />}
        />
    )
}

export default inject('testCaseStore')(observer(TestResultCase));