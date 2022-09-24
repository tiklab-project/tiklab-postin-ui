import React, {useEffect, useState} from "react";
import ApxMethodTest from "./test";
import {localProxySendTest, sendTest} from "../../../common/request/sendTestCommon";

const TestBox =(props)=>{

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
        <ApxMethodTest {...props}   getRes={getRes}/>
    )
}

export default TestBox;