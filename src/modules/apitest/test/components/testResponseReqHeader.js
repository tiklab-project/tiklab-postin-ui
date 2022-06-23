import React from "react";
import {inject, observer} from "mobx-react";
import RequestHeaderCommon from "../../common/reuqestHeaderCommon";

const TestResponseReqHeader = (props) => {
    const {testStore} = props;
    const {requestHeaderData} = testStore;

    return(
        <RequestHeaderCommon requestHeaderData={requestHeaderData} />
    )
}

export default inject("testStore")(observer(TestResponseReqHeader));