import React, { useState } from 'react';
import ExSelect from "../../exSelect";
import {headerParamDictionary} from "../../dictionary/dictionary";
import {Button, Space, Tooltip} from "antd";
import {ExTable} from "./tableCommon";

const HeaderTableCommon = (props) =>{
const {dataList, saveList, addNewList, deleteList} = props;
    
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'headerName',
            width: '30%',
            render: (text, record)=>(
                <ExSelect
                    dictionary={headerParamDictionary}
                    defaultValue={record.headerName}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'headerName'}
                />
            )
        },{
            title: '参数值',
            width: '40%',
            dataIndex: 'value',
            editable: true,
        },{
            title: '操作',
            width: '30%',
            dataIndex: 'operation',
            render: (text, record,index) =>(
                <Space>
                    <a onClick={()=>deleteList(record.id)}> 删除 </a>
                    {/*<a onClick={handleAdd}> 新行 </a>*/}
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
        let newData = dataList;
        let index = newData.findIndex((item) => row.id === item.id);
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

export default HeaderTableCommon;