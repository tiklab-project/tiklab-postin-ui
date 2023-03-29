import React, { useState } from 'react';
import {mockValueDictionary} from '../../dictionary/dictionary';
import ExSelect from "../../ExSelect";
import {ExTable} from "../../EditTable";
import {uuid} from "../../utils/createId";
import IconCommon from "../../IconCommon";
import {toJS} from "mobx";


/**
 * 查询参数
 */
const QueryTableCommon = (props) =>{
    const {dataList, saveList, deleteList,selectList,selectKeys } = props;

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



    /**
     * 保存数据
     */
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
        selectList(list)
    };

    const rowSelection = {
        defaultSelectedRowKeys:selectKeys,
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
