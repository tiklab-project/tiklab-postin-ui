import React from "react";
import "./schemaStyle.scss"
import ToggleSchema from "./toggleSchema";
import {inject, observer} from "mobx-react";



const Schema = (props) =>{
    const {jsonSchemaStore,apiResponseStore,httpId,resultId} = props
    const {schemaData} =jsonSchemaStore


    return(
        <ToggleSchema
            data={schemaData}
            deep={0}
            parent={schemaData}
            root={true}
            jsonSchemaStore={jsonSchemaStore}
            apiResponseStore={apiResponseStore}
            httpId={httpId}
            resultId={resultId}
        />
    )
}

export default inject("jsonSchemaStore","apiResponseStore")(observer(Schema));