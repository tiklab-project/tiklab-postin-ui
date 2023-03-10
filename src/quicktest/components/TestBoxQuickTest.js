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


    /**
     * 通过/request代理发送测试
     */
    const getRes = async  (data) =>{
        let response ;

        response= await localProxySendTest("/request",data)


        return response;
    }

    return(
        <TestdetailQuickTest {...props} getRes={getRes} />
    )
}

export default inject("testStore")(observer(TestBoxQuickTest));