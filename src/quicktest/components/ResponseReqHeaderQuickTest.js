import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../api/http/test/common/ResHeaderCommon";
import {processResHeader} from "../../api/http/test/common/TestResponseFnCommon";

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