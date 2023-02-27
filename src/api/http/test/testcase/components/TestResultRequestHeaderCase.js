import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../common/ResHeaderCommon";
import {processResHeader} from "../../common/TestResponseFnCommon";

const TestResultRequestHeaderCase = (props) => {
    const {testCaseStore} = props;
    const {requestHeaderCaseData} = testCaseStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(requestHeaderCaseData)}
        />
    )
}

export default inject("testCaseStore")(observer(TestResultRequestHeaderCase));