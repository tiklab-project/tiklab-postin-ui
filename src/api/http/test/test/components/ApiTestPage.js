import React from "react";
import ApiTestContent from "./ApiTestContent";
import {localProxySendTest} from "../../../../../common/request/sendTestCommon";

/**
 * 接口测试页
 * 包含测试详情页
 */
const ApiTestPage =(props)=>{

    /**
     * 通过代理接口发送测试
     */
    const sendTest = async (data) =>{
        let response ;

        response= await localProxySendTest("/request",data)
        return response;
    }

    return(
        <ApiTestContent {...props}   sendTest={sendTest}/>
    )
}

export default ApiTestPage;