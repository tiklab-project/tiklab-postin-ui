/*
 * @Description: 请求参数中query可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-10 09:08:21
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Checkbox, Popconfirm} from 'antd';
import { mockValueDictionary } from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable} from '../../../common/editTable';

const QueryParam = (props) =>{
    const { queryParamStore } = props;
    const {
        findQueryParamList,
        deleteQueryParam,
        createQueryParam,
        updateQueryParam,
        queryParamList,
        setList,
        dataLength,
    } = queryParamStore;

    const [dataSource,setDataSource] = useState([])
    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect( ()=>{
        findQueryParamList(apxMethodId).then(res=>setDataSource(res))
    },[dataLength])

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '20%',
            editable: true,
        },
        {
            title: '必须',
            dataIndex: 'required',
            width: '6%',
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

        },{
            title: '说明',
            width: '30%',
            dataIndex: 'desc',
            editable: true,

        },
        {
            title: '操作',
            width: '10%',
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        }
    ]

    // 必须项的checked
    const toggleChecked = (e,row) => {
        let checked;
        if(e.target.checked){
            checked = 1
        }else{
            checked = 0
        }
        const data = {...row,  required: checked}

        handleSave(data)
    }

    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'QueryParamInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteQueryParam(record.id)}
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
                            && item.required === record.required
                            && item.desc === record.desc
                            && item.value === record.value
                                ? null
                                : <a onClick={() => upData(record)}>更新</a>
                        }
                    </>
                    :null
            )
        })
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createQueryParam(values)
        }
    }

    //更新
    const upData = (value) => {
        updateQueryParam(value).then(res=>setDataSource(res))
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = queryParamList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={queryParamList}
            handleSave={handleSave}
        />
    );
}


export default inject('queryParamStore')(observer(QueryParam));
