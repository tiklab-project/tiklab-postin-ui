import React from "react";
import {inject, observer} from "mobx-react";
import RequestHeaderCommon from "../../common/reuqestHeaderCommon";

const TestResultRequestHeaderCase = (props) => {
    const {testCaseStore} = props;
    const {requestHeaderCaseData} = testCaseStore;

    return(
        <RequestHeaderCommon requestHeaderData={requestHeaderCaseData} />
    )
}

export default inject("testCaseStore")(observer(TestResultRequestHeaderCase));