import React from "react";
import "./schemaStyle.scss"
import ToggleSchema from "./ToggleSchema";
import {inject, observer} from "mobx-react";

/**
 * schema
 */
const Schema = (props) =>{
    const {jsonSchemaStore,apiResponseStore,httpId,resultId} = props
    const {schemaData,setSchemaData} =jsonSchemaStore
    const {updateApiResponse} =apiResponseStore

    return(
        <ToggleSchema
            data={schemaData}
            schemaData={schemaData}
            setSchemaData={setSchemaData}
            deep={0}
            parent={schemaData}
            root={true}
            updateFn={updateApiResponse}
            httpId={httpId}
            resultId={resultId}
        />
    )
}

export default inject("jsonSchemaStore","apiResponseStore")(observer(Schema));