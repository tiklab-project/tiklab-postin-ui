import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../apitest/common/resHeaderCommon";
import {processResHeader} from "../../apitest/common/testResponseFnCommon";

const ResponseHeaderQuickTest = (props) => {
    const {quickTestStore} = props;
    const {responseHeaderData} = quickTestStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(responseHeaderData)}
        />
    )
}

export default inject("quickTestStore")(observer(ResponseHeaderQuickTest));