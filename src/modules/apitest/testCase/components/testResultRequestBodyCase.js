import React from 'react'
import { observer, inject } from 'mobx-react'
import RequestBodyCommon from "../../common/requestBodyCommon";

const TestResultRequestBodyCase = (props) => {
    const { testCaseStore } = props;
    const { requestBodyCaseData } = testCaseStore;

    return (
        <RequestBodyCommon requestBodyData={requestBodyCaseData}/>
    )
}

export default inject('testCaseStore')(observer(TestResultRequestBodyCase));