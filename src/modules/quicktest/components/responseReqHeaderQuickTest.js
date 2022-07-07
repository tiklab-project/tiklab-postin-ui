import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../apitest/common/resHeaderCommon";
import {processResHeader} from "../../apitest/common/testResponseFnCommon";

const ResponseReqHeaderQuickTest = (props) => {
    const {quickTestStore} = props;
    const {requestHeaderData} = quickTestStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(requestHeaderData)}
        />
    )
}

export default inject("quickTestStore")(observer(ResponseReqHeaderQuickTest));