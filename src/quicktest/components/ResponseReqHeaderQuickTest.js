import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../api/http/test/common/ResHeaderCommon";
import {processResHeader} from "../../api/http/test/common/TestResponseFnCommon";

/**
 * 快捷测试
 * 响应中的请求头
 */
const ResponseReqHeaderQuickTest = (props) => {
    const {quickTestStore} = props;
    const {requestHeaderData} = quickTestStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(requestHeaderData)}
        />
    )
}

export default inject("quickTestStore")(observer(ResponseReqHeaderQuickTest));