import React from "react";
import { JSONSchema6 } from 'json-schema';
import JsonSchemaList from "./jsonSchemaList";

const Test = () =>{

    const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "age": {
                "type": "integer"
            },
            "address": {
                "type": "object",
                "properties": {
                    "street": {
                        "type": "string"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string"
                    }
                },
                "required": ["street", "city", "state"]
            }
        },
        "required": [ "name", "age", "address"]
    }

    return(
        <>
            <JsonSchemaList schema={schema} />
        </>
    )
}

export default Test;