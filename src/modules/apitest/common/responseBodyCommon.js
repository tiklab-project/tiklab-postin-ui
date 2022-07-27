import React from "react";
import CodeMirror from "../../common/codeMirror";


const ResponseBodyCommon = (props) => {
    const {responseBodyData} = props;

    const processData =(data)=>{

        //空值
        if(!data) return ""

        try{
            return JSON.stringify(JSON.parse(data),null,4)
        }catch (e) {
            return data
        }

    }

    return(
        <CodeMirror
            value={processData(responseBodyData)}
            mediaType={"application/javascript"}
            readOnly={true}
        />
    )

}

export default ResponseBodyCommon;