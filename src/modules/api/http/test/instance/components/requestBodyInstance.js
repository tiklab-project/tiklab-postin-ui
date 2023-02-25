import React from 'react'
import RequestBodyCommon from "../../common/requestBodyCommon";

const RequestBodyInstance = (props) => {
    const {reqBody} = props;

    return (
        <RequestBodyCommon requestBodyData={reqBody}/>
    )
}

export default RequestBodyInstance;