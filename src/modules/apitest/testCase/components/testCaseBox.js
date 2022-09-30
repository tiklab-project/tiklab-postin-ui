import React, {useEffect, useState} from "react";
import {localProxySendTest, sendTest} from "../../../common/request/sendTestCommon";
import TestCaseDetail from "./testCaseDetail";

const TestCaseBox =(props)=>{

    const [proxyItem, setProxyItem] = useState("default");

    const getRes =  (data) =>{
        let response ;

        if(proxyItem==="default"){
            response=  sendTest(data);
        }

        if(proxyItem==="local"){
            response=  localProxySendTest("/local-proxy",data)
        }

        if(proxyItem==="cloud"){
            response=  localProxySendTest("/cloud-proxy",data)
        }


        return response;
    }

    useEffect(()=>{
        setProxyItem(localStorage.getItem("PROXY_ITEM"))
    },[proxyItem])


    return(
        <TestCaseDetail {...props}   getRes={getRes}/>
    )
}

export default TestCaseBox;