import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../common/resHeaderCommon";
import {processResHeader} from "../../common/testResponseFnCommon";

const ResponseHeaderInstance = (props) => {
    const {instanceStore} = props;
    const {responseHeaderData} = instanceStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(responseHeaderData)}
        />
    )
}

export default inject("instanceStore")(observer(ResponseHeaderInstance));