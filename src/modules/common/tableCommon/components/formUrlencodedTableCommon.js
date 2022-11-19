import React, {useEffect, useState} from 'react';
import {ExTable} from "../../editTable";
import DataTypeSelect from "../../../common/dataTypeSelect";
import {Space, Tooltip} from "antd";
import {uuid} from "../../../../common/utils/createId";

const FormUrlencodedTableCommon = (props) =>{
    const {dataList, saveList, addNewList, deleteList, bodyType, getFormUrlencodedList } = props;

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '30%',
            editable: true,
        },
        {
            title: '数据类型',
            width: '20%',
            dataIndex: 'dataType',
            render: (text, record)=>(
                <DataTypeSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                />
            )
        },{
            title: '参数值',
            width: '30%',
            dataIndex: 'value',
            editable: true,
        },{
            title: '操作',
            width: '150',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record) =>(
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
        const newData = dataList;
        const index = newData.findIndex((item) => row.id === item.id);
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

export default FormUrlencodedTableCommon;