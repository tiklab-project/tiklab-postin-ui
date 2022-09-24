import React from "react";
import RequestHeaderTestCase from "./requestHeaderTestCase";
import QueryParamTestCase from "./queryParamTestCase";
import PreParamTestCase from "./preScriptCase";
import BackParamTestCase from "./afterScriptCase";
import AssertParamTestCase from "./assertParamTestCase";
import RequestTab from "../../../common/tableCommon/components/requestTab";
import RequestBodyTestCase from "./requestBodyTestCase";


const TestCaseRequest = (props) => {


    return(
        <RequestTab
            header={<RequestHeaderTestCase />}
            query={<QueryParamTestCase />}
            body={<RequestBodyTestCase/>}
            pre={<PreParamTestCase />}
            after={<BackParamTestCase />}
            assert={<AssertParamTestCase />}
        />
    )
}

export default TestCaseRequest;
