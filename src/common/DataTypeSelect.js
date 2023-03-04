import React from "react";
import {Select} from "antd";
import {dataTypeDictionary} from "./dictionary/dictionary";

const {Option} = Select;

/**
 * 数据类型下拉选择框
 */
const DataTypeSelect = (props) =>{
    const {defaultValue,handleSave,rowData,setNewRowAction} = props;


    /**
     * 选择
     */
    const onSelect = (value) => {
        const data = {
            ...rowData,
            dataType: value
        }
        handleSave(data)

        setNewRowAction&&setNewRowAction(true)
    }

    /**
     * list渲染
     */
    const renderItem = (data) => {
        return  data&&data.map((item) => <Option key={item} value={item}>{item}</Option>)
    }

    return(
        <Select
            onChange={(e) => onSelect(e)}
            style={{ width: "100%" }}
            defaultValue={defaultValue}
            bordered={false}
            allowClear
        >
            {renderItem(dataTypeDictionary)}
        </Select>
    )
}

export default DataTypeSelect;