import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../common/resHeaderCommon";
import {processResHeader} from "../../common/testResponseFnCommon";

const TestResponseReqHeader = (props) => {
    const {testStore} = props;
    const {requestHeaderData} = testStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(requestHeaderData)}
        />
    )
}

export default inject("testStore")(observer(TestResponseReqHeader));