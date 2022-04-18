import React from 'react'
import { Input } from 'antd';
const { TextArea } = Input;

const RequestBodyCommon = (props) => {
    const { requestBodyData } = props;

    return (
        <>
            <TextArea autoSize={true}  value={requestBodyData}/>
        </>
    )
}

export default RequestBodyCommon;