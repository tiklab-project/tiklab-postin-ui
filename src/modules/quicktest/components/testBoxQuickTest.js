import React, {useEffect, useState} from "react";
import {Button} from "antd";
import TestdetailQuickTest from "./testdetailQuickTest";
import {localProxySendTest, sendTest} from "../../common/request/sendTestCommon";


const TestBoxQuickTest = (props) =>{

    const [proxyItem, setProxyItem] = useState("default");

    const getRes =  (data) =>{
        let response ;

        if(proxyItem==="default"){
            response=  sendTest(data);
        }

        if(proxyItem==="local"){
            response=  localProxySendTest(data)
        }

        return response;
    }

    useEffect(()=>{
        setProxyItem(localStorage.getItem("PROXY_ITEM"))
    },[proxyItem])

    return(
        <TestdetailQuickTest {...props} getRes={getRes} />
    )
}

export default TestBoxQuickTest;