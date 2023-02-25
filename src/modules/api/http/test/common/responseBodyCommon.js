import React, {useState} from "react";
import "./testResponseStyle.scss"
import ReactMonacoEditor from "../../../../common/monacoEditor/reactMonacoEditor";

const ResponseBodyCommon = (props) => {
    const {responseBodyData,mediaType} = props;


    const [language, setLanguage] = useState();

    const processData =(data)=>{

        //空值
        if(!data) return

        if(JSON.parse(data) instanceof Object){
            setLanguage("json")
            return JSON.stringify(JSON.parse(data),null,4)
        }else {
            setLanguage("text")
            return  JSON.parse(data)
        }
    }



    return(
        <div className={"codemirror-box"}>
            {/*<CodeMirror*/}
            {/*    value={processData(responseBodyData)}*/}
            {/*    mediaType={mediaType}*/}
            {/*    readOnly={true}*/}
            {/*/>*/}

            <ReactMonacoEditor
                value={JSON.stringify(JSON.parse(responseBodyData),null,4)}
                language={"json"}
                height={"400px"}
                width={"100%"}
                readOnly={true}
            />
        </div>
    )

}

export default ResponseBodyCommon;