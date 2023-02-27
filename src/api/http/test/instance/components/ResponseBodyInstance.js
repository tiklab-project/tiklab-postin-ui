import React from "react";
import ResponseBodyCommon from "../../common/ResponseBodyCommon";

const ResponseBodyInstance = (props) => {
    const {resBody} = props;

    return(
        <ResponseBodyCommon responseBodyData={resBody}/>
    )

}

export default ResponseBodyInstance;