import React from "react";
import {inject, observer} from "mobx-react";
import RequestHeaderCommon from "../../apitest/common/reuqestHeaderCommon";

const ResponseReqHeaderQuickTest = (props) => {
    const {quickTestStore} = props;
    const {requestHeaderData} = quickTestStore;

    return(
        <RequestHeaderCommon requestHeaderData={requestHeaderData} />
    )
}

export default inject("quickTestStore")(observer(ResponseReqHeaderQuickTest));