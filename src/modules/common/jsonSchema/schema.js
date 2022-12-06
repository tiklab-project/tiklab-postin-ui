import React, {useEffect, useState} from "react";
import {Checkbox, Input, Select} from "antd";
import "./schemaStyle.scss"
import {schemaEnum} from "./schemaEnum"
import IconCommon from "../iconCommon";
import MockSelect from "./mockSelect";
import ToggleSchema from "./toggleSchema";
import {inject, observer} from "mobx-react";

const {Option} = Select

const Schema = (props) =>{
    const {data,jsonSchemaStore} = props
    const {setSchemaData,schemaData} =jsonSchemaStore

    useEffect(()=>{
        setSchemaData({
            "type": "object",
            "properties": {
                "filed1": {
                    "type": "string",
                    "mock": {
                        "mock": "@rgb"
                    },
                    "description": "热输入",
                },
                "filed2": {
                    "type": "object",
                    "description": "认识2432423",
                    "properties": {
                        "filed1222": {
                            "type": "string"

                        },
                        "filed2222": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "filed1222"
                    ]
                },
                "filed3": {
                    "type": "object",
                    "description": "24242342"
                }
            },
            "required": [
                "filed2"
            ]
        })
    },[])



    return(
        <>
            <ToggleSchema
                data={schemaData}
                deep={0}
                parent={schemaData}
                root={true}
                jsonSchemaStore={jsonSchemaStore}
            />
        </>

    )

}

export default inject("jsonSchemaStore")(observer(Schema));