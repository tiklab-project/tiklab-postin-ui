import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../common/resHeaderCommon";
import {processResHeader} from "../../common/testResponseFnCommon";

const TestResultResponseHeaderCase = (props) => {
    const {testCaseStore} = props;
    const {responseHeaderCaseData} = testCaseStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(responseHeaderCaseData)}
        />
    )
}

export default inject("testCaseStore")(observer(TestResultResponseHeaderCase));