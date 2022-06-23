import React from "react";
import {Input} from "antd";

const {TextArea} = Input;

const ResponseHeaderCommon = (props) => {
    const {responseHeaderData} = props;

    return(
        <>
            <TextArea autoSize={{minRows: 4, maxRows: 10 }} value={responseHeaderData}/>
        </>
    )

}

export default ResponseHeaderCommon;