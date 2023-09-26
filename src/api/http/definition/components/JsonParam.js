import React, {useCallback, useEffect, useState} from "react";
import JsonSchemaTable from "../../../../common/JsonSchemaTable/JsonSchemaTable";
import jsonParamStore from "../store/JsonParamStore"

const JsonParam = () =>{
    const {findJsonParam,updateJsonParam} = jsonParamStore;
    const [schemaData, setSchemaData] = useState();

    const apxMethodId = localStorage.getItem('apxMethodId');
    useEffect(async ()=>{
        let res = await findJsonParam(apxMethodId)
        if( res.code === 0){
            setSchemaData(JSON.parse(res.data.jsonText))
        }
    },[])

    const jsonSchemaUpdate = useCallback(async (updateValue)=>{
        let param = {
            id:apxMethodId,
            httpId:apxMethodId,
            jsonText:JSON.stringify(updateValue),
        }

        await updateJsonParam(param)
    },[])

    return(
        <JsonSchemaTable
            schema={schemaData}
            updateFn={jsonSchemaUpdate}
        />
    )
}

export default JsonParam;