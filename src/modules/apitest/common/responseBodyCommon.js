import React from "react";
import CodeMirror from "../../common/codeMirror";


const ResponseBodyCommon = (props) => {
    const {responseBodyData} = props;

    const processData = (data)=>{

        //空值
        if(!data) return ""

        //object类型
        let dataType = data instanceof Object;
        if(dataType){
            return JSON.stringify(data,null,4)
        }else{
            return data
        }
    }

    return(
        <>
            <CodeMirror
                value={processData(responseBodyData)}
                mediaType={"application/javascript"}
                readOnly={true}
            />
        </>
    )

}

export default ResponseBodyCommon;