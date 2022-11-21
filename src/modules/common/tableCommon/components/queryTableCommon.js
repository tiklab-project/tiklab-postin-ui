import React, { useState } from 'react';
import { Space, Tooltip, Button } from 'antd';
import {mockValueDictionary} from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable} from "../../../common/editTable";
import {uuid} from "../../../../common/utils/createId";
import IconCommon from "../../iconCommon";
import {toJS} from "mobx";


// 请求参数的可编辑表格
const QueryTableCommon = (props) =>{
    const {dataList, saveList, addNewList, deleteList } = props;

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '40%',
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
            width: '150',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record) =>(
                <>
                    {
                        Object.keys(record).length===1
                            ?null
                            :<IconCommon
                                icon={"shanchu3"}
                                className="icon-s table-edit-icon"
                                onClick={()=>deleteList(record.id)}
                            />
                    }
                </>
            )
        }
    ]

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // 保存数据
    const handleSave =  (row) => {
        let newData = toJS(dataList);
        //获取当前行对应的下标
        let index = newData.findIndex((item) => row.id === item.id);
        //替换上一次录入的数据
        newData.splice(index, 1, { ...newData[index], ...row });

        //如果是最后一行，添加新行
        if(index===newData.length-1){
            newData.push({id:uuid()})
        }

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

export default QueryTableCommon;
