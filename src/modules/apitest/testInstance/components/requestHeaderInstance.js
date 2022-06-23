import React from "react";
import {inject, observer} from "mobx-react";
import RequestHeaderCommon from "../../common/reuqestHeaderCommon";

const RequestHeaderInstance = (props) => {
    const {instanceStore} = props;
    const {requestHeaderData} = instanceStore;

    return(
        <RequestHeaderCommon requestHeaderData={requestHeaderData} />
    )
}

export default inject("instanceStore")(observer(RequestHeaderInstance));