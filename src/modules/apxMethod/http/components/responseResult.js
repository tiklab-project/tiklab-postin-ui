import React, {useEffect, useRef, useState} from "react";
import {Button, Radio} from "antd"

import {inject, observer} from "mobx-react";
import MonacoEditor from "../../../common/monacoEditor/monacoEditor";
import Schema from "../../../common/jsonSchema/schema";

function checkIsJsonSchema(json) {
    try {
        json = JSON.parse(json);
        if (json.properties && typeof json.properties === 'object' && !json.type) {
            json.type = 'object';
        }
        if (json.items && typeof json.items === 'object' && !json.type) {
            json.type = 'array';
        }
        if (!json.type) {
            return false;
        }
        json.type = json.type.toLowerCase();
        let types = ['object', 'string', 'number', 'array', 'boolean', 'integer'];
        if (types.indexOf(json.type) === -1) {
            return false;
        }
        return JSON.stringify(json);
    } catch (e) {
        return false;
    }
}

const ResponseResult = (props) =>{
    const {apiResponseStore,jsonSchemaStore} = props;
    const {findApiResponse,updateApiResponse} = apiResponseStore;
    const {schemaData} = jsonSchemaStore


    const [editorValue, setEditorValue] = useState();
    const [dataValue, setDataValue] = useState();

    const [type, setType] = useState("json");

    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(async ()=>{
        let data =  await findApiResponse(apxMethodId);
        if(data.jsonText){
            // let json = JSON.parse(data.jsonText)
            setDataValue(data.jsonText)
            setEditorValue(data.jsonText)
        }
    },[apxMethodId])


    const changeToFormat = async () =>{

        let params = {
            httpId:apxMethodId,
            id:apxMethodId,
            jsonText:editorValue

        }
        let res = await updateApiResponse(params)
        if(res.code===0){
            let data =  await findApiResponse(apxMethodId);
            if(data.jsonText){
                // let json = JSON.parse(data.jsonText)
                setDataValue(data.jsonText)
            }
        }
    }

    return(
        <div>
            <div style={{display:"flex","justifyContent":"space-between"}}>
                <Radio.Group defaultValue={type} onChange={(e) =>setType(e.target.value) }>
                    <Radio.Button value="json">json</Radio.Button>
                    <Radio.Button value="raw">raw</Radio.Button>
                </Radio.Group>
                {
                    editorValue!==dataValue
                        ? <Button className={"important-btn"} onClick={changeToFormat}>保存</Button>
                        : <span />
                }

            </div>

            {/*<Button onClick={changeToFormat}>格式</Button>*/}
            {
                type==="json"
                    ?
                     <Schema/>
                    :
                    <div>
                        <MonacoEditor
                            value={JSON.stringify(schemaData)}
                            setEditorValue={setEditorValue}
                        />
                    </div>

            }


        </div>

    )
}

export default inject("apiResponseStore","jsonSchemaStore")(observer(ResponseResult));