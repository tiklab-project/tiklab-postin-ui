import React from 'react';
import TestRequestHeader from './TestRequestHeader';
import TestQueryParam from './TestQueryParam';
import TestPreParam from './TestPreParam';
import TestAfterParam from './TestAfterParam';
import AssertParamTest from './AssertParamTest';
import RequestTab from "../../../../../common/tableCommon/components/RequestTab";
import RequestBodyTest from "./RequestBodyTest";

/**
 * 测试页
 * 请求区的tab
 */
const RequestTest = (props) => {
    const {tabTip} = props

    return(
        <RequestTab
            tabTip={tabTip}
            header={<TestRequestHeader />}
            query={<TestQueryParam />}
            body={<RequestBodyTest/>}
            pre={<TestPreParam />}
            after={<TestAfterParam />}
            assert={<AssertParamTest />}
        />
    )

}

export default RequestTest;
