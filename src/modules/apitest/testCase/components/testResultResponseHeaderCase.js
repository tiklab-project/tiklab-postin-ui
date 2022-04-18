import React from "react";
import {inject, observer} from "mobx-react";
import ResponseHeaderCommon from "../../common/responseHeaderCommon";

const TestResultResponseHeaderCase = (props) => {
    const {testCaseStore} = props;
    const {responseHeaderCaseData} = testCaseStore;

    return(
        <ResponseHeaderCommon responseHeaderData={responseHeaderCaseData}/>
    )
}

export default inject("testCaseStore")(observer(TestResultResponseHeaderCase));