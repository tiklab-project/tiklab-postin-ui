import React, {useEffect, useState} from "react";
import ReactMonacoEditor from "../../../../../common/monacoEditor/ReactMonacoEditor";
import testStore from "../store/TestStore";
import Mock from "mockjs"
import {jsonSchemaToJson} from "../../../../common/TestFunctionCommon";
const JsonParamTest = () =>{
    const { jsonSchema,getJsonData} = testStore;

    const [json, setJson] = useState();

    useEffect(()=>{
        let processJson = jsonSchemaToJson(JSON.parse(jsonSchema))


        let jsonData =JSON.stringify(Mock.mock(processJson))
        setJson(jsonData)
        getJsonData(jsonData)

    },[])


    const jsonChange = (value) =>{
        setJson(value)
        getJsonData(value)
    }

    return(
        <>
            <ReactMonacoEditor
                editorChange={jsonChange}
                value={json}
                language={"json"}
                height={"200px"}
                width={"100%"}
            />
        </>
    )
}

export default JsonParamTest;