import React from "react";
import {inject, observer} from "mobx-react";
import ResponseBodyCommon from "../../common/responseBodyCommon";

const TestResponseResBody = (props) => {
    const {testStore} = props;
    const {responseBodyData} = testStore;

    return(
        <ResponseBodyCommon responseBodyData={responseBodyData}/>
    )

}

export default inject("testStore")(observer(TestResponseResBody));