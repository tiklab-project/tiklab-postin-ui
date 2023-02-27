import React from "react";
import ResHeaderCommon from "../../common/ResHeaderCommon";
import {processResHeader} from "../../common/TestResponseFnCommon";

const ResponseHeaderInstance = (props) => {
    const {resHeader} = props;

    return(
        <ResHeaderCommon
            headers={processResHeader(resHeader)}
        />
    )
}

export default ResponseHeaderInstance;