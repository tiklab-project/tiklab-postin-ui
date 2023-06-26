import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import RequestBodyCom from "../../../../common/tableCommon/components/RequestBodyCom";
import FormParam from "./FormParam";
import FormUrlencoded from "./FormUrlencoded";
import RawParam from "./RawParam";
import apiRequestStore from "../store/ApiRequestStore";

/**
 *接口定义中的请求体
 */
const RequestBody  = (props) =>{
    const {
        findApiRequest,
        updateApiRequest,
        bodyType
    } = apiRequestStore;

    const [radioType, setRadioType] = useState("none");

    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findApiRequest(apxMethodId).then(res=>{
            setRadioType(res.bodyType)
        })
    },[bodyType])

    let bodyTypeDictionary ={
        none:"none",
        formdata:"form-data",
        formUrlencoded:"x-www-form-urlencoded",
        // json:"json",
        raw:"raw",
        // binary:"binary"
    }

    return(
        <RequestBodyCom
            radioValue={radioType}
            updateFn={updateApiRequest}
            setRadioType={setRadioType}
            form={<FormParam  />}
            formUrlencoded={<FormUrlencoded />}
            // json={<JsonParam />}
            raw={<RawParam />}
            binary={null}
            bodyTypeDictionary={bodyTypeDictionary}
        />
    )
}

export default observer(RequestBody);