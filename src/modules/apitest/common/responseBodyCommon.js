import React from "react";
import CodeMirror from "../../common/codeMirror";


const ResponseBodyCommon = (props) => {
    const {responseBodyData} = props;

    const processData =(data)=>{

        //空值
        if(!data) return null

        // if(JSON.parse(data) ){
        //     if(JSON.parse(data) instanceof Object){
        //         return JSON.stringify(JSON.parse(data),null,4)
        //     }else {
        //         return JSON.parse(data)
        //     }
        // }else {
        //     return data
        // }
        return data

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