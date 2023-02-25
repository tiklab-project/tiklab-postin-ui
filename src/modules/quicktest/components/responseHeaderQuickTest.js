import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../api/http/test/common/resHeaderCommon";
import {processResHeader} from "../../api/http/test/common/testResponseFnCommon";

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