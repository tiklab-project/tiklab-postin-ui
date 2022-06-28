import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import RequestBodyCom from "../../../common/tableCommon/components/requestBodyCom";
import FormParam from "./formParam";
import FormUrlencoded from "./formUrlencoded";
import JsonParam from "./jsonParam";
import RawParam from "./rawParam";


/**
 *接口定义中的请求体
 */
const RequestBody  = (props) =>{
    const { requestBodyStore } = props;
    const {
        findRequestBody,
        updateRequestBody,
        bodyType
    } = requestBodyStore;

    const [radioType, setRadioType] = useState("none");

    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findRequestBody(apxMethodId).then(res=>{
            setRadioType(res.bodyType)
        })
    },[bodyType])


    return(
        <RequestBodyCom
            radioValue={radioType}
            updateFn={updateRequestBody}
            setRadioType={setRadioType}
            form={<FormParam  />}
            formUrlencoded={<FormUrlencoded />}
            json={<JsonParam />}
            raw={<RawParam />}
            binary={null}
        />
    )
}

export default inject('requestBodyStore')(observer(RequestBody));