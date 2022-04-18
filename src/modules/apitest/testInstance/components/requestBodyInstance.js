import React from 'react'
import { observer, inject } from 'mobx-react'
import RequestBodyCommon from "../../common/requestBodyCommon";

const RequestBodyInstance = (props) => {
    const { instanceStore } = props;
    const { requestBodyData } = instanceStore;

    return (
        <RequestBodyCommon requestBodyData={requestBodyData}/>
    )
}

export default inject('instanceStore')(observer(RequestBodyInstance));