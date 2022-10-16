import React from "react";
import CodeMirror from "../../common/codeMirror";
import "./testResponseStyle.scss"

const ResponseBodyCommon = (props) => {
    const {responseBodyData,mediaType} = props;

    const processData =(data)=>{

        //空值
        if(!data) return

        if(JSON.parse(data) instanceof Object){
            console.log("333")
            return JSON.stringify(JSON.parse(data),null,4)
        }else {
            return  JSON.parse(data)
        }




    }

    return(
        <div className={"codemirror-box"}>
            <CodeMirror
                value={processData(responseBodyData)}
                mediaType={mediaType}
                readOnly={true}
            />
        </div>
    )

}

export default ResponseBodyCommon;