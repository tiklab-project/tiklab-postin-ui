import React from "react";
import {observer} from "mobx-react";
import FormDataQuickTest from "./FormDataQuickTest";
import FormUrlencodedQuickTest from "./FormUrlencodedQuickTest";
import RawQuickTest from "./RawQuickTest";
import RequestBodyCom from "../../../common/tableCommon/components/RequestBodyCom";
import tabQuickTestStore from "../../store/TabQuickTestStore";
import { mediaTypeDir} from "../../../common/dictionary/dictionary";
/**
 * 快捷测试
 * 请求体
 */
const RequestBodyQuickTest  = (props) =>{
    const {
        updateBodyType,
        requestBodyType
    } = tabQuickTestStore;


    return(
        <RequestBodyCom
            radioValue={requestBodyType}
            updateFn={updateBodyType}

            form={<FormDataQuickTest />}
            formUrlencoded={<FormUrlencodedQuickTest />}
            // json={<JsonQuickTest />}
            raw={<RawQuickTest />}
            binary={null}
            bodyTypeDictionary={mediaTypeDir}
        />
    )
}

export default observer(RequestBodyQuickTest);