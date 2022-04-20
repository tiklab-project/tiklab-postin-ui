import React from "react";
import {inject, observer} from "mobx-react";
import ResponseHeaderCommon from "../../common/responseHeaderCommon";

const ResponseHeaderInstance = (props) => {
    const {instanceStore} = props;
    const {responseHeaderData} = instanceStore;

    return(
        <ResponseHeaderCommon responseHeaderData={responseHeaderData}/>
    )
}

export default inject("instanceStore")(observer(ResponseHeaderInstance));