import React, { useState } from 'react';
import { Space, Tooltip, Button } from 'antd';
import {mockValueDictionary} from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable} from "../../../common/editTable";


// 请求参数的可编辑表格
const QueryTableCommon = (props) =>{
    const {dataList, saveList, addNewList, deleteList } = props;

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '30%',
            editable: true,
        },{
            title: '参数值',
            width: '40%',
            dataIndex: 'value',
            render: (text, record)=>(
                <ExSelect
                    dictionary={mockValueDictionary}
                    defaultValue={record.value}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'value'}
                />
            )

        },{
            title: '操作',
            width: '30%',
            dataIndex: 'operation',
            render: (text, record,index) =>(
                <Space>
                    <a onClick={()=>deleteList(record.id)}> 删除 </a>
                    <a onClick={handleAdd}> 新行 </a>
                </Space>
            )
        }
    ]

    const [count, setCount] = useState(1);

    const handleAdd = () => {
        setCount(count + 1)
        const newData = {id: count};
        const  dataSource = [...dataList, newData]

        addNewList(dataSource)
    };


    // 保存数据
    const handleSave = (row) => {
        const newData = dataList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });

        saveList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={dataList}
            handleSave={handleSave}
        />
    );
}

export default QueryTableCommon;