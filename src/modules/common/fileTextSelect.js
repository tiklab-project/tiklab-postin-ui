import React from "react";
import {Select} from "antd";

const {Option} = Select;

const FileTextSelect = (props) => {
    const {defaultValue,handleSave,rowData} = props;

    const selectChange = (e) =>{
        let newData = {
            ...rowData,
            dataType:e
        }
        handleSave(newData);
    }

    return(
        <Select
            style={{width:"100%"}}
            defaultValue={defaultValue}
            onChange={(e)=>selectChange(e)}
            bordered={false}
        >
            <Option value={"text"}>text</Option>
            <Option value={"file"}>file</Option>
        </Select>
    )
}

export default FileTextSelect;