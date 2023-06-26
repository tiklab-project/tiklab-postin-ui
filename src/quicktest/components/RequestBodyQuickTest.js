import React from "react";
import {inject, observer} from "mobx-react";
import FormDataQuickTest from "./FormDataQuickTest";
import FormUrlencodedQuickTest from "./FormUrlencodedQuickTest";
import RawQuickTest from "./RawQuickTest";
import RequestBodyCom from "../../common/tableCommon/components/RequestBodyCom";
import tabQuickTestStore from "../store/TabQuickTestStore";
/**
 * 快捷测试
 * 请求体
 */
const RequestBodyQuickTest  = (props) =>{
    const {
        updateBodyType,
        requestBodyType
    } = tabQuickTestStore;

    let bodyTypeDictionary ={
        none:"none",
        formdata:"form-data",
        formUrlencoded:"x-www-form-urlencoded",
        raw:"raw",
        // binary:"binary"
    }


    return(
        <RequestBodyCom
            radioValue={requestBodyType}
            updateFn={updateBodyType}

            form={<FormDataQuickTest />}
            formUrlencoded={<FormUrlencodedQuickTest />}
            // json={<JsonQuickTest />}
            raw={<RawQuickTest />}
            binary={null}
            bodyTypeDictionary={bodyTypeDictionary}
        />
    )
}

export default observer(RequestBodyQuickTest);