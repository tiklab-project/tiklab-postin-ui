import React from "react";
import ResponseBodyCommon from "../../apitest/common/responseBodyCommon";
import {inject, observer} from "mobx-react";

const ResponseBodyQuickTest = (props) =>{
    const {quickTestStore} = props;
    const {responseBodyData} = quickTestStore;

    return(
        <ResponseBodyCommon responseBodyData={responseBodyData}/>
    )
}
export default inject("quickTestStore")(observer(ResponseBodyQuickTest));