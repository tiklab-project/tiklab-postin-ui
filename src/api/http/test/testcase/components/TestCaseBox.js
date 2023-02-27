import React, {useEffect, useState} from "react";
import {localProxySendTest, sendTest} from "../../../../../common/request/sendTestCommon";
import TestCaseDetail from "./TestCaseDetail";
import {inject, observer} from "mobx-react";

const TestCaseBox =(props)=>{
    const {testStore} = props;
    const {proxyItem} = testStore;

    let proxy = localStorage.getItem("PROXY_ITEM")


    const getRes =  (data) =>{
        let response ;


        switch (proxy?proxy:proxyItem) {
            case "local":
                response=  localProxySendTest("/local-proxy",data)
                break;
            case "cloud":
                response=  localProxySendTest("/cloud-proxy",data)
                break;
            default:
                response=  sendTest(data);
                break

        }

        return response;
    }

    return(
        <TestCaseDetail {...props}   getRes={getRes}/>
    )
}

export default inject("testStore")(observer(TestCaseBox));