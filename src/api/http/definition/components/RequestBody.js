import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import RequestBodyCom from "../../../../common/tableCommon/components/RequestBodyCom";
import FormParam from "./FormParam";
import FormUrlencoded from "./FormUrlencoded";
import RawParam from "../../../api/components/RawParam";
import apiRequestStore from "../../../api/store/ApiRequestStore";
import JsonParam from "../../../api/components/JsonParam";
import {mediaTypeDir} from "../../../../common/dictionary/dictionary";

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

    const apiId = localStorage.getItem('apiId');

    useEffect(()=>{
        findApiRequest(apiId).then(res=>{
            setRadioType(res.bodyType)
        })
    },[bodyType])


    return(
        <RequestBodyCom
            radioValue={radioType}
            updateFn={updateApiRequest}
            setRadioType={setRadioType}
            form={<FormParam  />}
            formUrlencoded={<FormUrlencoded />}
            json={<JsonParam />}
            raw={<RawParam />}
            binary={null}
            bodyTypeDictionary={mediaTypeDir}
        />
    )
}

export default observer(RequestBody);