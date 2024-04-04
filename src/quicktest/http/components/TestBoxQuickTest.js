import React from "react";
import {localProxySendTest} from "../../../common/request/sendTestCommon";
import {observer} from "mobx-react";
import TabsQuickTest from "../../common/TabsQuickTest";
import "./testCase.scss"
/**
 * 快捷测试
 * 发送测试
 */
const TestBoxQuickTest = (props) =>{

    /**
     * web 和 electron 请求不一样
     * web通过/request代理发送测试
     */
    const sendTest = async (data) =>{
        return await localProxySendTest( data);
    }

    return(
        <TabsQuickTest {...props} sendTest={sendTest} />
    )
}

export default observer(TestBoxQuickTest);