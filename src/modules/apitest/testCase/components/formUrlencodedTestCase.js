/*
 * @Description:  请求参数中From可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:47:43
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Popconfirm} from 'antd';
import { mockValueDictionary } from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable}from '../../../common/editTable';
import DataTypeSelect from "../../../common/dataTypeSelect";


const FormUrlencodedTestCase = (props) =>{
    const { formUrlencodedTestCaseStore } = props;
    const {
        findFormUrlencodedTestCaseList,
        deleteFormUrlencodedTestCase,
        createFormUrlencodedTestCase,
        updateFormUrlencodedTestCase,
        setList,
        formUrlencodedTestCaseList,
        dataLength
    } = formUrlencodedTestCaseStore;

    const [dataSource,setDataSoure] =useState([])
    const testCaseId =  localStorage.getItem('testCaseId') ;
    useEffect( ()=>{
        findFormUrlencodedTestCaseList(testCaseId).then(res => setDataSoure(res));
    },[dataLength])

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '20%',
            editable: true,
        },{
            title: '数据类型',
            width: '15%',
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
            width: '20%',
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
        },

        {
            title: '操作',
            width: '15%',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        },
        {
            title: '',
            width: '30%',
            dataIndex: 'none',
        }
    ]

    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'FormUrlencodedTestCaseInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteFormUrlencodedTestCase(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <a href="#">删除</a>
                </Popconfirm>
            </Space>
        }
    }

    //本地编辑的值和返回的值比较，不想同的会显示更新按钮
    const updateView = (record,data)=>{
        return data&&data.map((item) => {
            return (
                item.id === record.id
                    ?<>
                        {
                            item.paramName === record.paramName
                            && item.dataType === record.dataType
                            && item.value === record.value
                                ? null
                                : <a onClick={() => upData(record)}>更新</a>
                        }
                    </>
                    :null
            )
        })
    }

    //更新
    const upData = (value) => {
        updateFormUrlencodedTestCase(value).then(res=>setDataSoure(res));
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            delete values.id;
            createFormUrlencodedTestCase(values)
        }
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = [...formUrlencodedTestCaseList];
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={formUrlencodedTestCaseList}
            handleSave={handleSave}
        />
    );

}



export default inject('formUrlencodedTestCaseStore')(observer(FormUrlencodedTestCase));
