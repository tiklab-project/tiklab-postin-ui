import React from "react";
import ResHeaderCommon from "../../common/resHeaderCommon";
import {processResHeader} from "../../common/testResponseFnCommon";

const ResponseHeaderInstance = (props) => {
    const {resHeader} = props;

    return(
        <ResHeaderCommon
            headers={processResHeader(resHeader)}
        />
    )
}

export default ResponseHeaderInstance;