import React from 'react';
import TestRequestHeader from './testRequestHeader';
import TestQueryParam from './testQueryParam';
import TestPreParam from './testPreParam';
import TestAfterParam from './testAfterParam';
import AssertParamTest from './assertParamTest';
import RequestTab from "../../../../../common/tableCommon/components/requestTab";
import RequestBodyTest from "./requestBodyTest";


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
