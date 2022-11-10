import React, { useState, useEffect } from 'react';
import { Tooltip, Space } from 'antd';
import {dataTypeDictionary, mockValueDictionary} from "../../dictionary/dictionary";
import ExSelect from "../../../common/exSelect";
import {ExTable} from "../../editTable";
import {uuid} from "../../../../common/utils/createId";

// 请求参数的可编辑表格组件
const JsonTableCommon = (props) => {
    const { getJsonList,dataList,saveList,addNewList,deleteList,setJsonChild, bodyType } = props;

    const columns = [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '20%',
            editable: true,
        },{
            title: '数据类型',
            width: '10%',
            dataIndex: 'dataType',
            render: (text, record)=>(
                <ExSelect
                    dictionary={dataTypeDictionary}
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'dataType'}
                />
            )
        },{
            title: '参数值',
            width: '30%',
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
            width: '10%',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record) =>(
                <Space>
                    <Tooltip title="数据类型: object，添加子行"><a onClick={() => addChild(record.dataType,record.id)}> 子</a></Tooltip>
                    <Tooltip title="删除数据"><a onClick={() =>deleteList(record.id)} type="primary"> 删除 </a></Tooltip>
                    <Tooltip title="新增一行"><a onClick={() =>handleAdd()} > 新行 </a></Tooltip>
                </Space>
            )
        },
        {
            title: '',
            width: '25%',
            dataIndex: 'none',
        }
    ]

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // 添加下一行
    const handleAdd = () => {
        const newData = [ {id: uuid()}];

        addNewList(newData)
    };

    // 点击子按钮，添加子行
    const addChild = (dataType, parentid) => {
        if(dataType === 'object'){

            setJsonChild(parentid,uuid())
        }
    }

    // 递归数据
    const loop = (data, result=[], row) => {
        const parentId = row.parent && row.parent.id;
        // 没有parentid
        if(!parentId) {
            result = data.map(item => {
                if(item.id === row.id) {
                    return {...item, ...row}
                }
                return item
            })
        } else {
            data.forEach((item, index) => {
                if(item.id && item.id === row.id) {
                    result.push({
                        ...row,
                        children:item.children ? [] : null
                    })
                } else {
                    result.push({
                        ...item,
                        children:item.children ? [] : null
                    })
                }
                if(item.children && item.children.length > 0) {
                    loop(item.children, result[index].children, row)
                }
            });
        }
        return result
    }


    // 编辑单元格，保存数据
    const handleSave = (row) => {
        let result = loop(dataList, [], row)
        saveList(result)
    };

    const onSelectChange = (newSelectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log('list: ', selectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    //表格前的checkbox根据“必须”项，当必选时，设置disabled
    const rowSelection = {
        selectedRowKeys,
        onChange:onSelectChange
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

export default JsonTableCommon;