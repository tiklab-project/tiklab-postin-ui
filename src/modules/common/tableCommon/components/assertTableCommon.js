import React, {useState} from "react";
import {Button, Select, Space, Tooltip} from "antd";
import {ExTable} from "../../editTable";

const {Option} = Select;

const AssertTableCommon = (props)=>{
    const {dataList, saveList, addNewList, deleteList} = props;

    let columns= [
        {
            title: '来源',
            dataIndex: 'source',
            width: '15%',
            // align:'center',
            render:(text,record) =>  (
                <Select
                    defaultValue={()=>setSelectValue(record.source)}
                    bordered={false}
                    style={{'width':200}}
                    onSelect= {(e) => onSelect(e,record)}
                >
                    <Option value="状态码">状态码</Option>
                    <Option value="响应头">响应头</Option>
                    <Option value="响应体">响应体</Option>
                </Select>
            )
        },
        {
            title: '属性名称',
            dataIndex: 'propertyName',
            width: '25%',
            // align:'center',
            editable: true,
        },
        {
            title: '比较符',
            width: '10%',
            dataIndex: 'comparator',
            // align:'center',
            // editable: true,
            render:()=>(<span>=</span>)
        },
        {
            title: '参数值',
            width: '25%',
            dataIndex: 'value',
            // align:'center',
            editable: true,


        },
        {
            title: '操作',
            width: '10%',
            // align:'center',
            dataIndex: 'operation',
            render:(text,record,index)=>(
                <Space>
                    <Tooltip title="删除数据"><Button onClick={()=> deleteList(record.id)}> 删除 </Button></Tooltip>
                    <Tooltip title="添加数据"><Button onClick={handleAdd}> 添加 </Button></Tooltip>
                </Space>
            )

        }
    ]



    // 表格select选择事件
    const onSelect = (value, row) => {
        let setValue = ''
        if(value === '状态码'){
            setValue = 1
        }else if(value === '响应头'){
            setValue = 2
        }else if(value === '响应体'){
            setValue = 3
        }
        const data = {
            ...row,
            source: setValue
        }
        handleSave(data)
    }

    const setSelectValue = (value) => {
        switch(value){
            case 1:
                return '状态码';
            case 2:
                return '响应头';
            case 3:
                return '响应体';
        }
    }

    const [count, setCount] = useState(1)

    const handleAdd = () => {
        setCount(count + 1)
        const newData = {id: count};
        const  dataSource = [...dataList, newData]

        addNewList(dataSource)
    };

    // 保存数据
    const handleSave = (row) => {
        const newData = dataList;
        const index = newData.findIndex((item) =>row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });

        saveList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={dataList}
            handleSave={handleSave}
        />
    )

}

export default  AssertTableCommon;