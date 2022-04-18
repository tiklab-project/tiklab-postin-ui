import React from "react";
import { observer, inject } from "mobx-react";
import TestResultCommon from "../../common/testResultCommon";
import TestResultResponseBodyCase from "./testResultResponseBodyCase";
import TestResultResponseHeaderCase from "./testResultResponseHeaderCase";
import TestResultRequestHeaderCase from "./testResultRequestHeaderCase";
import TestResultRequestBodyCase from "./testResultRequestBodyCase";
import AssertResponseTestCase from "./assertResponseTestCase";

const TestResultCase = (props) => {
    const { testCaseStore, showResponse } = props;
    const { status, time } = testCaseStore;
    
    return(
        <TestResultCommon
            status={status}
            time={time}
            showResponse={showResponse}
            responseBody={<TestResultResponseBodyCase />}
            responseHeader={<TestResultResponseHeaderCase />}
            requestHeader={<TestResultRequestHeaderCase />}
            requestBody={<TestResultRequestBodyCase />}
            assertResult={<AssertResponseTestCase />}
        />
    )
}

export default inject('testCaseStore')(observer(TestResultCase));