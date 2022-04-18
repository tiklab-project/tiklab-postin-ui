import React from 'react'
import { observer, inject } from 'mobx-react'
import RequestBodyCommon from "../../common/requestBodyCommon";

const TestResponseReqBody = (props) => {
    const { testStore } = props;
    const { requestBodyData } = testStore;

    return (
        <RequestBodyCommon requestBodyData={requestBodyData}/>
    )
}

export default inject('testStore')(observer(TestResponseReqBody));