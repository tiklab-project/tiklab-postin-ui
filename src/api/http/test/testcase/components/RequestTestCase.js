import React from "react";
import RequestHeaderTestCase from "./RequestHeaderTestCase";
import QueryParamTestCase from "./QueryParamTestCase";
import PreParamTestCase from "./PreScriptCase";
import BackParamTestCase from "./AfterScriptCase";
import AssertParamTestCase from "./AssertParamTestCase";
import RequestTab from "../../../../../common/tableCommon/components/RequestTab";
import RequestBodyTestCase from "./RequestBodyTestCase";


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
