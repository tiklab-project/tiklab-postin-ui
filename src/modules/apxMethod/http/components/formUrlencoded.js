/*
 * @Description:  请求参数中From可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:47:43
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Checkbox, Popconfirm, Select} from 'antd';
import { mockValueDictionary} from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable}from '../../../common/editTable';
import DataTypeSelect from "../../../common/dataTypeSelect";

const FormUrlencoded = (props) =>{

    const { formUrlencodedStore } = props;
    const {
        findFormUrlencodedList,
        deleteFormUrlencoded,
        createFormUrlencoded,
        updateFormUrlencoded,
        setList,
        formUrlencodedList,
        dataLength
    } = formUrlencodedStore;

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '20%',
            editable: true,
        }, {
            title: '数据类型',
            width: '8%',
            dataIndex: 'dataType',
            render: (text, record)=>(
                <DataTypeSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                />
            )
        }, {
            title: '必须',
            dataIndex: 'required',
            width: '6%',
            align:"center",
            render:(text,record) =>  (
                <Checkbox
                    defaultChecked={record.required}
                    onChange={(value) => toggleChecked(value, record)}
                />
            )
        },{
            title: '示例值',
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
        }, {
            title: '说明',
            width: '20%',
            dataIndex: 'desc',
            editable: true,

        }, {
            title: '操作',
            dataIndex: 'operation',
            width: '10%',
            fixed: 'right',
            render: (text, record,index) =>(operation(record,dataSource))
        },
        {
            title: '',
            width: '24%',
            dataIndex: 'none',
        }
    ]

    // 表格checked
    const toggleChecked= (e,row)=> {
        let checked;
        if(e.target.checked){
            checked = 1
        }else{
            checked = 0
        }
        const data = {
            ...row,
            required: checked
        }
        handleSave(data)
    }

    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'FormUrlencodedInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return data&&data.map((item) => {
                return (
                    item.id === record.id
                        ?<Space key={item.id}>
                            {
                                item.paramName === record.paramName &&
                                item.dataType === record.dataType && item.required === record.required &&
                                item.desc === record.desc && item.value === record.value
                                    ?null
                                    :<a onClick={() =>upData(record)}>更新</a>
                            }
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={() =>deleteFormUrlencoded(record.id)}
                                okText='确定'
                                cancelText='取消'
                            >
                                <a href="#">删除</a>
                            </Popconfirm>
                        </Space>
                        :null
                )
            })
        }
    }

    const [dataSource,setDataSoure] =useState([])

    const apxMethodId = localStorage.getItem('apxMethodId');
    useEffect( ()=>{
        findFormUrlencodedList(apxMethodId).then(res => setDataSoure(res));
    },[dataLength])

    //更新
    const upData = (value) => {
        updateFormUrlencoded(value).then(res=>setDataSoure(res));
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            delete values.id;
            createFormUrlencoded(values)
        }
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = [...formUrlencodedList];

        const index = newData.findIndex((item) => row.id === item.id);

        newData.splice(index, 1, { ...newData[index], ...row });

        setList(newData)
    };


    return (
        <ExTable
            columns={columns}
            dataSource={formUrlencodedList}
            handleSave={handleSave}
        />
    );

}



export default inject('formUrlencodedStore')(observer(FormUrlencoded));
