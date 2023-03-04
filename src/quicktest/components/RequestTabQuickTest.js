import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import HeaderQuickTest from "./HeaderQuickTest";
import QueryQuickTest from "./QueryQuickTest";

import PreQuickTest from "./PreQuickTest";
import AfterQuickTest from "./AfterQuickTest";
import AssertQuickTest from "./AssertQuickTest";
import RequestTab from "../../common/tableCommon/components/RequestTab";
import RequestBodyQuickTest from "./RequestBodyQuickTest";

/**
 * 快捷测试
 * 请求中的tab
 */
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