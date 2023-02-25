import React from "react";
import ApiTestContent from "./apiTestContent";
import {localProxySendTest, sendTest} from "../../../../../common/request/sendTestCommon";
import {inject, observer} from "mobx-react";

const ApiTestPage =(props)=>{
    const {testStore} = props;
    const {proxyItem} = testStore;

    let proxy = localStorage.getItem("PROXY_ITEM")


    const getRes = async (data) =>{
        let response ;

        response= await localProxySendTest("/request",data)
        // switch (proxy?proxy:proxyItem) {
        //     case "local":
        //         response= await localProxySendTest("http://127.0.0.1:3009/local-proxy",data)
        //         break;
        //     case "cloud":
        //         response= await localProxySendTest("http://172.11.1.15:3009/cloud-proxy",data)
        //         break;
        //     default:
        //         response=  sendTest(data);
        //         break
        //
        // }

        return response;
    }

    return(
        <ApiTestContent {...props}   getRes={getRes}/>
    )
}

export default inject("testStore")(observer(ApiTestPage));