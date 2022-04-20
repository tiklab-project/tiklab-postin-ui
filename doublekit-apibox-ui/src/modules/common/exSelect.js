/**
 * @description：下拉选择框
 * @date: 2021-07-08 09:40
 */
import React, {useEffect, useState} from 'react';
import { Select } from "antd";

const {Option}=Select;

const ExSelect = (props) => {

    const {dictionary,defaultValue,handleSave,rowData,dataIndex} = props;

    const [record,setRecord] = useState([]);

    useEffect(()=>{
        setRecord(defaultValue)
    },[])

    //选值
    const onChangeSelect = (value) => {
        setRecord(value)
        const data = rowData
        data[dataIndex]=value;
        let newData = {...data};
        handleSave(newData);
    }

    //搜索
    const onSearchSelect = (value) => {
        if(!!value){
            setRecord(value)
            const data = rowData
            data[dataIndex]=value;
            let newData = {...data};
            handleSave(newData)
        }
    }

    //失去焦点
    const onBlurSelect = () => {
        if(!!record){
            onChangeSelect(record);
        }
    }

    const renderItem = (data) => {
        return  data&&data.map((item) => <Option key={item} value={item}>{item}</Option>)
    }


    return (
        <Select
            // defaultValue={'Accept'}
            allowClear
            showSearch
            // placeholder="请选择"
            onChange={(e) => onChangeSelect(e)}
            onSearch={value => onSearchSelect(value)}
            onBlur={() => onBlurSelect()}
            style={{ width: 170 }}
            value={record }
            bordered={false}
        >
            {renderItem(dictionary)}
        </Select>
    )


}

export default ExSelect;
