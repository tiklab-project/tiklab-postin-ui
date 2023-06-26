import React from "react";
import "./schemaStyle.scss"
import ToggleSchema from "./ToggleSchema";
import {observer} from "mobx-react";
import jsonSchemaStore from "./JsonSchemaStore";
import apiResponseStore from "../../api/http/definition/store/ApiResponseStore";
/**
 * schema
 */
const Schema = (props) =>{
    const {httpId,resultId} = props
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

export default observer(Schema);