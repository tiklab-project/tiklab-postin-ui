import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer, inject } from "mobx-react";
import { toJS} from 'mobx'
import { Table, Input, Button, Form, Space, Tooltip, Select } from 'antd';
import {ExTable} from "../../../common/editTable";

const { Option } = Select;

// 共享父组件的值
const EditableContext = React.createContext();

// 请求参数的可编辑表格
const AssertParamTestCase = (props) =>{
    const { assertParamTestCaseStore, radioValue } = props;
    const {
        findAssertParamTestCaseList,
        deleteAssertParamTestCase,
        createAssertParamTestCase,
        updateAssertParamTestCase,
        assertParamTestCaseDataSource,
        setList,
        assertParamTestCaseList,
    } = assertParamTestCaseStore;

    let columns= [
        {
            title: '来源',
            dataIndex: 'source',
            width: '20%',
            render:(text,record) =>  (
                <Select
                    defaultValue={setSelectValue(record.source)}
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
            editable: true,
        },
        {
            title: '比较符',
            width: '10%',
            dataIndex: 'comparator',
            editable: true,

        },
        {
            title: '参数值',
            width: '25%',
            dataIndex: 'value',
            editable: true,

        },
        {
            title: '操作',
            width: '10%',
            align:'center',
            dataIndex: 'operation',
            render: (text, record,index) =>(operation(record))
        }
    ]

      // colums 里的操作
      const operation = (record) => {
        if(record.id === 'AssertParamTestCaseInitRow'){
            return <Tooltip title="添加数据"><Button onClick={() =>onCreated(record)} >添加</Button></Tooltip>
        }else{
            const data = toJS(assertParamTestCaseDataSource)
            return data.map((item) => {
                if(item.id === record.id){
                    const isValue = item.source === record.source && item.propertyName === record.propertyName && item.comparator === record.comparator && item.value === record.value;
                    if(isValue){
                        return (
                            <Space key={item.id}>
                                <Tooltip title="更新数据"><Button disabled onClick={() =>updateAssertParamTestCase(record)} > 更新</Button></Tooltip>
                                <Tooltip title="删除数据"><Button onClick={() =>deleteAssertParamTestCase(record.id)}> 删除 </Button></Tooltip>
                            </Space>
                        )
                    }else{
                        return (
                            <Space key={item.id}>
                                <Tooltip title="更新数据"><Button onClick={() =>updateAssertParamTestCase(record)} > 更新</Button></Tooltip>
                                <Tooltip title="删除数据"><Button onClick={() =>deleteAssertParamTestCase(record.id)}> 删除 </Button></Tooltip>
                            </Space>
                        )
                    }
                }
            })
        }
    }


    const id =  localStorage.getItem('testCaseId') ;
    useEffect( ()=>{
        findAssertParamTestCaseList(id)
    },[radioValue])


    // 表格select选择事件
    const onSelect = (value, row) => {
        let setValue;
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


    // 添加
    const onCreated = (data) => {
        const values = data;
        // 创建新行的时候自带一个id，所以删了，后台会自行创建id
        delete values.id;
        createAssertParamTestCase(values);
    }

    // 保存数据
    const handleSave = (row) => {
        const newData =assertParamTestCaseList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={assertParamTestCaseList}
            handleSave={handleSave}
        />
    );
}

export default inject('assertParamTestCaseStore')(observer(AssertParamTestCase));
