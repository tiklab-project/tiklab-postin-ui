import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Popconfirm, Space} from 'antd';
import {ExTable} from "../../common/editTable";

// 请求参数的可编辑表格
const FormParamMock = (props) =>{
    const { mockFormParamStore } = props;
    const { 
        findFormParamMockList, 
        deleteFormParamMock, 
        createFormParamMock, 
        updateFormParamMock,
        mockFormParamList,
        setList,
        dataLength,
    } = mockFormParamStore;

    const [dataSource,setDataSource] = useState([])
    const mockId = localStorage.getItem('mockId')

    useEffect( ()=>{
        findFormParamMockList(mockId).then(res=>setDataSource(res))
    },[dataLength])

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '30%',
            editable: true,
        },
        {
            title: '参数值',
            width: '30%',
            dataIndex: 'value',
            editable: true,
        },
        {
            title: '操作',
            width: '10%',
            dataIndex: 'operation',
            render: (text, record) =>( operation(record,dataSource) )
        },
        {
            title: '',
            width: '30%',
            dataIndex: 'none',
        }
    ]

    // colums 里的操作
    const operation = (record,data) => {
        if(record.id === 'mockFormParamInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteFormParamMock(record.id)}
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
        updateFormParamMock(value).then(res => setDataSource(res))
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createFormParamMock(values)
        }
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = mockFormParamList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData); 
    };

    return (
        <ExTable
            columns={columns}
            dataSource={mockFormParamList}
            handleSave={handleSave}
        />
    ); 
}

export default inject('mockFormParamStore')(observer(FormParamMock));
