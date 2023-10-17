import React, {useEffect, useState} from "react";
import ReactMonacoEditor from "../../../../common/monacoEditor/ReactMonacoEditor";
import wsStore from "../../ws/store/WSStore";
import {jsonSchemaToJson} from "../../../common/TestFunctionCommon";
import Mock from "mockjs";

const RawTestWS = (props) =>{
    const {bodyType,rawText,jsonText,messageData,setMessage} = wsStore
    const [type, setType] = useState("text");

    useEffect(()=>{
        switch (bodyType) {
            case "raw":
                setType("text")
                setMessage(rawText);
                break;
            case "json":
                setType("json")
                let processJson =jsonSchemaToJson(JSON.parse(jsonText));
                let json =  JSON.stringify(Mock.mock(processJson));
                setMessage(json);
                break;
        }
    },[messageData])

    const editChange = (value) =>{
        setMessage(value)
    }

    return(
        <div className={"ws-raw-box"}>
            <ReactMonacoEditor
                editorChange={editChange}
                value={messageData}
                language={type}
                height={"200px"}
                width={"100%"}
            />
        </div>
    )
}

export default RawTestWS;