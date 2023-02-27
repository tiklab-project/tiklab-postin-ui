import React from 'react'
import { observer, inject } from 'mobx-react'
import RequestBodyCommon from "../../api/http/test/common/RequestBodyCommon";

const ResponseReqBodyQuickTest = (props) => {
    const { quickTestStore } = props;
    const { requestBodyData } = quickTestStore;

    return (
        <RequestBodyCommon requestBodyData={requestBodyData}/>
    )
}

export default inject('quickTestStore')(observer(ResponseReqBodyQuickTest));