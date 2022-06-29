import React from "react";
import RequestBodyCom from "../../../common/tableCommon/components/requestBodyCom";
import {inject, observer} from "mobx-react";
import FormParamTest from './testFormParam';
import JsonParamTest from "./testJsonParam";
import FormUrlencodedTest from "./FormUrlencodedTest";
import RawParamTest from "./testRawParam";

const RequestBodyTest = (props)=>{
    const { requestBodyTestStore } = props;

    const { getBodyType, updateBodyType,bodyType } = requestBodyTestStore;

    return(
        <RequestBodyCom
            radioValue={bodyType}
            updateFn={updateBodyType}
            setRadioType={getBodyType}
            form={<FormParamTest bodyType={bodyType}/>}
            formUrlencoded={<FormUrlencodedTest  bodyType={bodyType}/>}
            json={<JsonParamTest bodyType={bodyType}/>}
            raw={<RawParamTest  bodyType={bodyType}/>}
            binary={null}
        />
    )
}

export default inject('requestBodyTestStore')(observer(RequestBodyTest));
