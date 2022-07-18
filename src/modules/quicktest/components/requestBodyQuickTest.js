import React from "react";
import {inject, observer} from "mobx-react";
import FormDataQuickTest from "./formDataQuickTest";
import FormUrlencodedQuickTest from "./formUrlencodedQuickTest";
import JsonQuickTest from "./jsonQuickTest";
import RawQuickTest from "./rawQuickTest";
import RequestBodyCom from "../../common/tableCommon/components/requestBodyCom";


/**
 *请求体
 */
const RequestBodyQuickTest  = (props) =>{
    const { requestBodyQuickTestStore } = props;
    const {
        updateBodyType,
        getBodyType,
        bodyType
    } = requestBodyQuickTestStore;

    return(
        <RequestBodyCom
            radioValue={bodyType}
            updateFn={updateBodyType}
            setRadioType={getBodyType}
            form={<FormDataQuickTest bodyType={bodyType}/>}
            formUrlencoded={<FormUrlencodedQuickTest bodyType={bodyType}/>}
            json={<JsonQuickTest bodyType={bodyType}/>}
            raw={<RawQuickTest bodyType={bodyType}/>}
            binary={null}
        />
    )
}

export default inject('requestBodyQuickTestStore')(observer(RequestBodyQuickTest));