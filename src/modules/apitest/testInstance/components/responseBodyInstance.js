import React from "react";
import {inject, observer} from "mobx-react";
import ResponseBodyCommon from "../../common/responseBodyCommon";

const ResponseBodyInstance = (props) => {
    const {instanceStore} = props;
    const {responseBodyData} = instanceStore;

    return(
        <ResponseBodyCommon responseBodyData={responseBodyData}/>
    )

}

export default inject("instanceStore")(observer(ResponseBodyInstance));