import React, {useState} from "react";
import {Button, Select, Space, Tooltip} from "antd";
import {ExTable} from "../../EditTable";
import {toJS} from "mobx";
import {uuid} from "../../utils/createId";
import IconCommon from "../../IconCommon";
import {assertCompare} from "../../dictionary/dictionary";

const {Option} = Select;

/**
 * 断言可编辑表格
 */
const AssertTableCommon = (props)=>{
    const {dataList, saveList, deleteList} = props;

    let columns= [
        {
            title: '来源',
            dataIndex: 'source',
            width: '20%',
            render:(text,record) =>  (
                <Select
                    defaultValue={record.source}
                    allowClear
                    bordered={false}
                    style={{'width':"100%"}}
                    onSelect= {(e) => onSelect(e,record)}
                >
                    <Option value={1}>状态码</Option>
                    <Option value={2}>响应头</Option>
                    <Option value={3}>响应体</Option>
                </Select>
            )
        },
        {
            title: '属性名称',
            dataIndex: 'propertyName',
            width: '25%',
            editable: true,
        },
        {
            title: '比较符',
            width: '10%',
            dataIndex: 'comparator',
            render:(text,record) =>  (
                <Select
                    defaultValue={record.comparator}
                    allowClear
                    bordered={false}
                    style={{'width':"100%"}}
                    onSelect= {(e) => onSelectCompare(e,record)}
                >
                    <Option value={assertCompare.EQUAL}> = </Option>
                    <Option value={assertCompare.GREATER_THAN}> &gt; </Option>
                    <Option value={assertCompare.LESS_THAN}> &lt; </Option>
                    <Option value={assertCompare.GREATER_THAN_EQUAL}> &gt;= </Option>
                    <Option value={assertCompare.LESS_THAN_EQUAL}> &lt;= </Option>
                </Select>
            )
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
     * 表格checked
     */
    const onSelect = (value, row) => {
        const data = {
            ...row,
            source: value
        }
        handleSave(data);
    }

    /**
     * compare
     */
    const onSelectCompare = (value, row) => {
        const data = {
            ...row,
            comparator: value
        }
        handleSave(data);
    }

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

    return (
        <ExTable
            columns={columns}
            dataSource={dataList}
            handleSave={handleSave}
        />
    )

}

export default  AssertTableCommon;