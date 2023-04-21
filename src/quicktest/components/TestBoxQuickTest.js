import React from "react";
import TestdetailQuickTest from "./TestdetailQuickTest";
import {localProxySendTest} from "../../common/request/sendTestCommon";
import {inject, observer} from "mobx-react";

/**
 * 快捷测试
 * 发送测试
 */
const TestBoxQuickTest = (props) =>{


    /**
     * web 和 electron 请求不一样
     * web通过/request代理发送测试
     */
    const sendRequest = async  (data) =>{
        return await localProxySendTest("/request", data);
    }

    return(
        <TestdetailQuickTest {...props} sendRequest={sendRequest} />
    )
}

export default inject("testStore")(observer(TestBoxQuickTest));