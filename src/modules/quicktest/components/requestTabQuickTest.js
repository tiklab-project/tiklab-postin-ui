import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import HeaderQuickTest from "./headerQuickTest";
import QueryQuickTest from "./queryQuickTest";

import PreQuickTest from "./preQuickTest";
import AfterQuickTest from "./afterQuickTest";
import AssertQuickTest from "./assertQuickTest";
import RequestTab from "../../common/tableCommon/components/requestTab";
import RequestBodyQuickTest from "./requestBodyQuickTest";

const RequestTabQuickTest = (props) =>{
    const {instanceId} = props;

     useEffect(()=>{
         console.log(instanceId)
     },[instanceId])

    return(
        <RequestTab
           header={<HeaderQuickTest instanceId={instanceId}/>}
           query={<QueryQuickTest instanceId={instanceId}/>}
           body={<RequestBodyQuickTest instanceId={instanceId} />}
           pre={<PreQuickTest instanceId={instanceId}/>}
           after={<AfterQuickTest instanceId={instanceId}/>}
           assert={<AssertQuickTest />}
        />

    )
}

export default inject("requestBodyQuickTestStore")(observer(RequestTabQuickTest));