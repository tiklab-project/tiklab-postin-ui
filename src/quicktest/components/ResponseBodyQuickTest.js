import React from "react";
import ResponseBodyCommon from "../../api/http/test/common/ResponseBodyCommon";
import {inject, observer} from "mobx-react";

/**
 * 快捷测试
 * 响应体
 */
const ResponseBodyQuickTest = (props) =>{
    const {quickTestStore} = props;
    const {responseBodyData} = quickTestStore;

    return(
        <ResponseBodyCommon responseBodyData={responseBodyData}/>
    )
}
export default inject("quickTestStore")(observer(ResponseBodyQuickTest));