import React from 'react'
import RequestBodyCommon from "../../common/RequestBodyCommon";

const RequestBodyInstance = (props) => {
    const {reqBody} = props;

    return (
        <RequestBodyCommon requestBodyData={reqBody}/>
    )
}

export default RequestBodyInstance;