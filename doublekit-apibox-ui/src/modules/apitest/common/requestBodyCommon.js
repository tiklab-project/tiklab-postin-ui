import React from 'react'
import { Input } from 'antd';
const { TextArea } = Input;

const RequestBodyCommon = (props) => {
    const { requestBodyData } = props;

    return (
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={requestBodyData}
        />
    )
}

export default RequestBodyCommon;