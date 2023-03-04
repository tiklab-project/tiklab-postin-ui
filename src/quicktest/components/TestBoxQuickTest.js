import React, {useEffect, useState} from "react";
import {Button} from "antd";
import TestdetailQuickTest from "./TestdetailQuickTest";
import {localProxySendTest, sendTest} from "../../common/request/sendTestCommon";
import {inject, observer} from "mobx-react";

/**
 * 快捷测试
 * 发送测试
 */
const TestBoxQuickTest = (props) =>{
    const {testStore} = props;
    const {proxyItem} = testStore;

    let proxy = localStorage.getItem("PROXY_ITEM")


    /**
     * 通过/request代理发送测试
     */
    const getRes = async  (data) =>{
        let response ;

        response= await localProxySendTest("/request",data)
        // switch (proxy?proxy:proxyItem) {
        //     case "local":
        //         response=  localProxySendTest("/local-proxy",data)
        //         break;
        //     case "cloud":
        //         response=  localProxySendTest("/cloud-proxy",data)
        //         break;
        //     default:
        //         response=  sendTest(data);
        //         break
        //
        // }

        return response;
    }

    return(
        <TestdetailQuickTest {...props} getRes={getRes} />
    )
}

export default inject("testStore")(observer(TestBoxQuickTest));