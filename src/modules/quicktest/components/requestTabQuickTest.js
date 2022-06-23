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
    const {requestBodyQuickTestStore,instanceId} = props;
    const {bodyType,getBodyType,setBodyType} = requestBodyQuickTestStore

    return(
        <RequestTabCommon
            bodyType={bodyType}
            getBodyType={getBodyType}
            setBodyType={setBodyType}
            headerComponent={<HeaderQuickTest instanceId={instanceId}/>}
            queryComponent={<QueryQuickTest instanceId={instanceId}/>}
            formDataComponent={<FormDataQuickTest bodyType={bodyType} instanceId={instanceId}/>}
            formUrlencodedComponent={<FormUrlencodedQuickTest bodyType={bodyType} instanceId={instanceId}/>}
            jsonComponent={<JsonQuickTest bodyType={bodyType} instanceId={instanceId}/>}
            rawComponent={<RawQuickTest bodyType={bodyType} instanceId={instanceId}/>}
            preScript={<PreQuickTest instanceId={instanceId}/>}
            afterScript={<AfterQuickTest instanceId={instanceId}/>}
            assert={<AssertQuickTest instanceId={instanceId}/>}
        />
    )
}

export default inject("requestBodyQuickTestStore")(observer(RequestTabQuickTest));