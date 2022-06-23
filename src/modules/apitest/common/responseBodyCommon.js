import React from "react";
import ReactJson from "react-json-view";
import {Input} from "antd";

const {TextArea} = Input;

const ResponseBodyCommon = (props) => {
    const {responseBodyData} = props;

    let dataType = responseBodyData instanceof Object;

    return(
        <>
            {
                dataType
                    ?<ReactJson
                        src={responseBodyData}
                        name={null}
                        style={{fontFamily:"sans-serif"}}
                        displayDataTypes={false}
                        enableClipboard={false}
                        displayObjectSize={false}
                    />
                    :<TextArea
                        autoSize={{minRows: 4, maxRows: 10 }}
                        value={responseBodyData}
                    />
            }
        </>
    )

}

export default ResponseBodyCommon;