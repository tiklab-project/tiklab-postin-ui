import React, {useEffect, useState} from 'react';
import {ExTable} from "../../EditTable";
import DataTypeSelect from "../../DataTypeSelect";
import {Space, Tooltip} from "antd";
import {uuid} from "../../utils/createId";
import IconCommon from "../../IconCommon";
import {toJS} from "mobx";

/**
 * formUrl
 */
const FormUrlencodedTableCommon = (props) =>{
    const {dataList, saveList, deleteList,selectList,selectKeys  } = props;

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

export default FormUrlencodedTableCommon;