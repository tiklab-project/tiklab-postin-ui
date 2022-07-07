import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../common/resHeaderCommon";
import {processResHeader} from "../../common/testResponseFnCommon";

const RequestHeaderInstance = (props) => {
    const {instanceStore} = props;
    const {requestHeaderData} = instanceStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(requestHeaderData)}
        />
    )
}

export default inject("instanceStore")(observer(RequestHeaderInstance));