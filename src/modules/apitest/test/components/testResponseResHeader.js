import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../common/resHeaderCommon";
import {processResHeader} from "../../common/testResponseFnCommon";

const TestResponseResHeader = (props) => {
    const {testStore} = props;
    const {responseHeaderData} = testStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(responseHeaderData)}
        />
    )
}

export default inject("testStore")(observer(TestResponseResHeader));