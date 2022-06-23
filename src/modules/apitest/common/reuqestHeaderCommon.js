import React from "react";
import {Input} from "antd";

const {TextArea} = Input;

const RequestHeaderCommon = (props) => {
    const {requestHeaderData} = props;

    return(
        <>
            <TextArea autoSize={{minRows: 4, maxRows: 10 }} value={requestHeaderData}/>
        </>
    )

}

export default RequestHeaderCommon;