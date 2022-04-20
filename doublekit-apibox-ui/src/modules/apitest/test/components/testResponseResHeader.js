import React from "react";
import {inject, observer} from "mobx-react";
import ResponseHeaderCommon from "../../common/responseHeaderCommon";

const TestResponseResHeader = (props) => {
    const {testStore} = props;
    const {responseHeaderData} = testStore;

    return(
        <ResponseHeaderCommon responseHeaderData={responseHeaderData}/>
    )
}

export default inject("testStore")(observer(TestResponseResHeader));