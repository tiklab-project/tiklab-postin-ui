import React from "react";
import RequestTabCommon from "../../common/tableCommon/components/requestTabCommon";
import {inject, observer} from "mobx-react";
import HeaderQuickTest from "./headerQuickTest";
import QueryQuickTest from "./queryQuickTest";
import FormDataQuickTest from "./formDataQuickTest";
import FormUrlencodedQuickTest from "./formUrlencodedQuickTest";
import JsonQuickTest from "./jsonQuickTest";
import RawQuickTest from "./rawQuickTest";
import PreQuickTest from "./preQuickTest";
import AfterQuickTest from "./afterQuickTest";
import AssertQuickTest from "./assertQuickTest";

const RequestTabQuickTest = (props) =>{
    const {requestBodyQuickTestStore} = props;
    const {bodyType,getBodyType,setBodyType} = requestBodyQuickTestStore

    return(
        <RequestTabCommon
            bodyType={bodyType}
            getBodyType={getBodyType}
            setBodyType={setBodyType}
            headerComponent={<HeaderQuickTest />}
            queryComponent={<QueryQuickTest />}
            formDataComponent={<FormDataQuickTest bodyType={bodyType} />}
            formUrlencodedComponent={<FormUrlencodedQuickTest bodyType={bodyType} />}
            jsonComponent={<JsonQuickTest bodyType={bodyType} />}
            rawComponent={<RawQuickTest bodyType={bodyType} />}
            preScript={<PreQuickTest />}
            afterScript={<AfterQuickTest />}
            assert={<AssertQuickTest />}
        />
    )
}

export default inject("requestBodyQuickTestStore")(observer(RequestTabQuickTest));