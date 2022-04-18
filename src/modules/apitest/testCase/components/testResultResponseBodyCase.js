import React from "react";
import {inject, observer} from "mobx-react";
import ResponseBodyCommon from "../../common/responseBodyCommon";

const TestResultResponseBodyCase = (props) => {
    const {testCaseStore} = props;
    const {responseBodyCaseData} = testCaseStore;

    return(
        <ResponseBodyCommon responseBodyData={responseBodyCaseData}/>
    )

}

export default inject("testCaseStore")(observer(TestResultResponseBodyCase));