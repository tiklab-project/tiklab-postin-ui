import React, {useState} from "react";
import {AutoComplete} from "antd";
import {schemaEnum} from "./schemaEnum";


const MockSelect = (props) =>{

    return(
        <AutoComplete
            defaultValue={props.defaultValue}
            options={schemaEnum.MOCK_SOURCE}
            style={{ width: "200px" }}
            // onSelect={onSelect}
            onBlur={props.onBlur}
            placeholder="mock"
            disabled={props.disabled}
        />
    )
}

export default MockSelect