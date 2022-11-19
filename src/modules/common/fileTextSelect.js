import React, {useEffect, useState} from "react";
import {Select} from "antd";

const {Option} = Select;

const FileTextSelect = (props) => {
    const {defaultValue,handleSave,rowData,setNewRowAction} = props;

    const [value, setValue] = useState();
    useEffect(()=>{
        setValue(defaultValue)
    },[defaultValue])

    const selectChange = (e) =>{
        let newData = {
            ...rowData,
            dataType:e
        }
        handleSave(newData);

        //可编辑表格里的下拉框，选中后面操作会显示
        setNewRowAction&&setNewRowAction(true)
    }

    return(
        <Select
            style={{width:"100%"}}
            value={value}
            onChange={(e)=>selectChange(e)}
            bordered={false}

        >
            <Option value={"text"}>text</Option>
            <Option value={"file"}>file</Option>
        </Select>
    )
}

export default FileTextSelect;