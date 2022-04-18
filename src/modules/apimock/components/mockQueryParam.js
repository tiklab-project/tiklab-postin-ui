import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Space, Popconfirm} from 'antd';
import {ExTable} from "../../common/editTable";

// 请求参数的可编辑表格
const QueryParamMock = (props) =>{
    const { mockQueryParamStore } = props;
    const { 
        findQueryParamMockList, 
        deleteQueryParamMock, 
        createQueryParamMock, 
        updateQueryParamMock, 
        setList,
        dataLength,
        mockQueryParamList
    } = mockQueryParamStore;

    const [dataSource,setDataSource] = useState([]);
    const mockId = localStorage.getItem('mockId');

    useEffect( ()=>{
        findQueryParamMockList(mockId).then(res=>setDataSource(res))
    },[dataLength])

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '25%',
            editable: true,
        },
        {
            title: '参数值',
            width: '50%',
            dataIndex: 'value',
            editable: true,
        },
        {
            title: '操作',
            width: '10%',
            dataIndex: 'operation',
            render: (text, record) =>( operation(record,dataSource) )
        }
    ]

    // colums 里的操作
    const operation = (record,data) => {
        if(record.id === 'mockQueryParamInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteQueryParamMock(record.id)}
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

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createQueryParamMock(values)
        }
    }

    //更新
    const upData = (value) => {
        updateQueryParamMock(value).then(res => setDataSource(res))
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = mockQueryParamList;
        const index = newData.findIndex((item) =>  row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData); 
    };

    return (
        <ExTable
            columns={columns}
            handleSave={handleSave}
            dataSource={mockQueryParamList}
        />
    ); 
}

export default inject('mockQueryParamStore')(observer(QueryParamMock));
