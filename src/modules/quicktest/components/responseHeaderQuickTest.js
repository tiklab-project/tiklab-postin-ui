import React from "react";
import {inject, observer} from "mobx-react";
import ResponseHeaderCommon from "../../apitest/common/responseHeaderCommon";

const ResponseHeaderQuickTest = (props) => {
    const {quickTestStore} = props;
    const {responseHeaderData} = quickTestStore;

    return(
        <ResponseHeaderCommon responseHeaderData={responseHeaderData}/>
    )
}

export default inject("quickTestStore")(observer(ResponseHeaderQuickTest));