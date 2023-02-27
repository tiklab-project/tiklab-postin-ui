import React from "react";
import ResHeaderCommon from "../../common/ResHeaderCommon";
import {processResHeader} from "../../common/TestResponseFnCommon";

const RequestHeaderInstance = (props) => {
    const {reqHeader} = props;

    return(
        <ResHeaderCommon
            headers={processResHeader(reqHeader)}
        />
    )
}

export default RequestHeaderInstance;