import React from "react";
import ResHeaderCommon from "../../common/resHeaderCommon";
import {processResHeader} from "../../common/testResponseFnCommon";

const RequestHeaderInstance = (props) => {
    const {reqHeader} = props;

    return(
        <ResHeaderCommon
            headers={processResHeader(reqHeader)}
        />
    )
}

export default RequestHeaderInstance;