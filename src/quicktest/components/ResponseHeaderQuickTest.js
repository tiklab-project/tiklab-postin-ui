import React from "react";
import {inject, observer} from "mobx-react";
import ResHeaderCommon from "../../api/http/test/common/ResHeaderCommon";
import {processResHeader} from "../../api/http/test/common/TestResponseFnCommon";

/**
 * 快捷测试
 * 响应头
 */
const ResponseHeaderQuickTest = (props) => {
    const {quickTestStore} = props;
    const {responseHeaderData} = quickTestStore;

    return(
        <ResHeaderCommon
            headers={processResHeader(responseHeaderData)}
        />
    )
}

export default inject("quickTestStore")(observer(ResponseHeaderQuickTest));