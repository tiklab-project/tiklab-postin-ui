import React, { Fragment, useEffect, useState } from 'react';
import TestRequestHeader from './testRequestHeader';
import TestQueryParam from './testQueryParam';
import TestFormParam from './testFormParam';
import TestJsonParam  from "./testJsonParam";
import TestRawParam from './testRawParam';
import TestPreParam from './testPreParam';
import TestAfterParam from './testAfterParam';
import AssertParamTest from './assertParamTest';
import { observer, inject } from "mobx-react";
import FormUrlencodedTest from "./FormUrlencodedTest";
import TestBinaryParam from "./testBinaryParam";
import RequestTabCommon from "../../../common/tableCommon/components/requestTabCommon";


// 输出参数 请求头部与请求参数的切换
const RequestTest = (props) => {
    const { requestBodyTestStore } = props;

    const { getBodyType, setBodyType,bodyTypeInfo } = requestBodyTestStore;


    return(
        <RequestTabCommon
            bodyType={bodyTypeInfo}
            getBodyType={getBodyType}
            setBodyType={setBodyType}
            headerComponent={<TestRequestHeader />}
            queryComponent={<TestQueryParam />}
            formDataComponent={<TestFormParam  bodyType={bodyTypeInfo}/>}
            formUrlencodedComponent={<FormUrlencodedTest  bodyType={bodyTypeInfo}/>}
            jsonComponent={<TestJsonParam  bodyType={bodyTypeInfo}/>}
            rawComponent={<TestRawParam  bodyType={bodyTypeInfo}/>}
            preScript={<TestPreParam />}
            afterScript={<TestAfterParam />}
            assert={<AssertParamTest />}
        />

    )

}

export default inject('requestBodyStore','requestBodyTestStore')(observer(RequestTest));
