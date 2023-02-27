import React from 'react';
import TestRequestHeader from './TestRequestHeader';
import TestQueryParam from './TestQueryParam';
import TestPreParam from './TestPreParam';
import TestAfterParam from './TestAfterParam';
import AssertParamTest from './AssertParamTest';
import RequestTab from "../../../../../common/tableCommon/components/RequestTab";
import RequestBodyTest from "./RequestBodyTest";


// 输出参数 请求头部与请求参数的切换
const RequestTest = (props) => {


    return(
        <RequestTab
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
