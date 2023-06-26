import React from 'react';
import RequestTab from "../../../../common/tableCommon/components/RequestTab";
import RequestHeader from "./RequestHeader";
import QueryParam from './QueryParam';
import RequestBody from "./RequestBody";
import PreParam from './PreParam';
import AfterScript from './AfterParam';
import {inject, observer} from "mobx-react";


/**
 * 请求中的tab组件
 */
const Request = (props) => {
    const {tabTip} = props


    return(
        <RequestTab
            tabTip={tabTip}
            header={<RequestHeader />}
            query={<QueryParam />}
            body={<RequestBody />}
            pre={<PreParam />}
            after={<AfterScript />}
        />
    )
}

export default observer(Request);
