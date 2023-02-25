import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import RequestBodyCom from "../../../../common/tableCommon/components/requestBodyCom";
import FormParam from "./formParam";
import FormUrlencoded from "./formUrlencoded";
import JsonParam from "./jsonParam";
import RawParam from "./rawParam";


/**
 *接口定义中的请求体
 */
const RequestBody  = (props) =>{
    const { apiRequestStore } = props;
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
            raw={<RawParam />}
            binary={null}
            bodyTypeDictionary={bodyTypeDictionary}
        />
    )
}

export default inject('apiRequestStore')(observer(RequestBody));