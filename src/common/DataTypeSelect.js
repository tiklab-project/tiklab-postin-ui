import React from "react";
import {Divider, Select} from "antd";
import {dataTypeDictionary} from "./dictionary/dictionary";
import ModeModal from "../support/dataStructure/components/modeModal";
import EvnMana from "../support/environment/components/Environment";

const {Option} = Select;

/**
 * 数据类型下拉选择框
 */
const DataTypeSelect = (props) =>{
    const {defaultValue,handleSave,rowData,setNewRowAction,model} = props;


    /**
     * 选择
     */
    const onSelect = (value) => {
        let data;
        if(value.model){
            data = {
                ...rowData,
                name:rowData.id==="root"?"root":value.name,
                dataType: "object",
                children: value.jsonScheme,
                model:true
            }
            handleSave(data)
        }

        if(!value.model&&value!=="model"){
             data = {
                ...rowData,
                dataType: value
            }
            handleSave(data)
        }

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
            {
                model&& <Option key={"model"}>
                    <ModeModal
                        selectModel={onSelect}
                    />
                </Option>
            }

        </Select>
    )
}

export default DataTypeSelect;