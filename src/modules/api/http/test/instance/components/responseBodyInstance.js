import React from "react";
import ResponseBodyCommon from "../../common/responseBodyCommon";

const ResponseBodyInstance = (props) => {
    const {resBody} = props;

    return(
        <ResponseBodyCommon responseBodyData={resBody}/>
    )

}

export default ResponseBodyInstance;