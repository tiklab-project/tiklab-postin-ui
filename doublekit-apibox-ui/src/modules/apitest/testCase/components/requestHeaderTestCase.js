import React, {useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Popconfirm, Space} from 'antd';
import {headerParamDictionary } from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable} from "../../../common/editTable";

// 请求头的可编辑表格
const RequestHeaderTestCase = (props) =>{
    const { requestHeaderTestCaseStore } = props;
    const { 
        findRequestHeaderTestCaseList, 
        deleteRequestHeaderTestCase, 
        createRequestHeaderTestCase, 
        updateRequestHeaderTestCase,
        setList,
        dataLength,
        requestHeaderTestCaseList,
    } = requestHeaderTestCaseStore;

    const [dataSource,setDataSource] = useState([])
    const testCaseId =  localStorage.getItem('testCaseId') ;

    useEffect( ()=>{
        findRequestHeaderTestCaseList(testCaseId).then(res=>setDataSource(res));
    },[dataLength])

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'headerName',
            width: '25%',
            render: (text, record)=>(
                <ExSelect
                    dictionary={headerParamDictionary}
                    defaultValue={record.headerName}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'headerName'}
                />
            )
        },
        {
            title: '参数值',
            width: '40%',
            dataIndex: 'value',
            editable: true,
        },
        {
            title: '操作',
            width: '10%',
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        }
    ]

    // colums 里的操作
    const operation = (record,data) => {
        if(record.id === 'RequestHeaderTestCaseInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteRequestHeaderTestCase(record.id)}
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
                        item.headerName === record.headerName
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
        updateRequestHeaderTestCase(value).then(res => setDataSource(res))
    }

    // 添加
    const onCreated = (values) => {
        // 创建新行的时候自带一个id，所以删了，后台会自行创建id
        delete values.id;
        createRequestHeaderTestCase(values);
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = requestHeaderTestCaseList;
        const index = newData.findIndex((item) =>  row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };
  
    return (
        <ExTable
            columns={columns}
            dataSource={requestHeaderTestCaseList}
            handleSave={handleSave}
        />
    ); 
}

export default inject('requestHeaderTestCaseStore')(observer(RequestHeaderTestCase));
