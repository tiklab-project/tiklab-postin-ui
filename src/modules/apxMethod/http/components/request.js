import React from 'react';
import RequestTab from "../../../common/tableCommon/components/requestTab";
import RequestHeader from "./requestHeader";
import QueryParam from './queryParam';
import RequestBody from "./requestBody";
import PreParam from './preParam';
import AfterScript from './afterParam';


// 输入参数
const Request = (props) => {


    return(
        <RequestTab
            header={<RequestHeader />}
            query={<QueryParam />}
            body={<RequestBody />}
            pre={<PreParam />}
            after={<AfterScript />}
        />
    )
}

export default Request;
