import React from 'react'
import CodeMirror from "../../../../common/CodeMirror";


const RequestBodyCommon = (props) => {
    const { requestBodyData } = props;

    return (
        <CodeMirror
            value={requestBodyData}
            mediaType={"application/javascript"}
            readOnly={true}
        />
    )
}

export default RequestBodyCommon;