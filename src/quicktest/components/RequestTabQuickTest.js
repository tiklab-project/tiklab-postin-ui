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

    return(
        <RequestTab
           header={<HeaderQuickTest />}
           query={<QueryQuickTest />}
           body={<RequestBodyQuickTest  />}
           pre={<PreQuickTest />}
           after={<AfterQuickTest />}
           assert={<AssertQuickTest />}
        />

    )
}

export default inject("requestBodyQuickTestStore")(observer(RequestTabQuickTest));