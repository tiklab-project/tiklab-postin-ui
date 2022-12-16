import React, {useEffect, useState} from "react";
import ApxMethodTest from "./test";
import {localProxySendTest, sendTest} from "../../../common/request/sendTestCommon";
import {inject, observer} from "mobx-react";

const TestBox =(props)=>{
    const {testStore} = props;
    const {proxyItem} = testStore;

    let proxy = localStorage.getItem("PROXY_ITEM")


    const getRes =  (data) =>{
        let response ;


        switch (proxy?proxy:proxyItem) {
            case "local":
                response=  localProxySendTest("http://127.0.0.1:3009/local-proxy",data)
                break;
            case "cloud":
                response=  localProxySendTest("http://172.11.1.15:3009/cloud-proxy",data)
                break;
            default:
                response=  sendTest(data);
                break

        }

        return response;
    }

    return(
        <ApxMethodTest {...props}   getRes={getRes}/>
    )
}

export default inject("testStore")(observer(TestBox));