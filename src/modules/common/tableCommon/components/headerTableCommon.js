import React, { useState } from 'react';
import ExSelect from "../../exSelect";
import {headerParamDictionary} from "../../dictionary/dictionary";
import {Button, Space, Tooltip} from "antd";
import {ExTable} from "./tableCommon";
import {uuid} from "../../../../common/utils/createId";

const HeaderTableCommon = (props) =>{
const {dataList, saveList, addNewList, deleteList} = props;
    
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'headerName',
            width: '40%',
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
            width: '150',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record,index) =>(
                <Space>
                    <a onClick={()=>deleteList(record.id)}> 删除 </a>
                    <a onClick={handleAdd}> 新行 </a>
                </Space>
            )
        }
    ]

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const handleAdd = () => {
        let newData = {id: uuid()};
        let dataSource = [...dataList, newData]

        addNewList(dataSource)


    };


    // 保存数据
    const handleSave = (row) => {
        let newData = dataList;
        let index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });

        saveList(newData)
    };

    const onSelectChange = (newSelectedRowKeys,list) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log('list: ', list);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <ExTable
            columns={columns}
            dataSource={dataList}
            handleSave={handleSave}
            rowSelection={rowSelection}
        />
    );
    
}

export default HeaderTableCommon;