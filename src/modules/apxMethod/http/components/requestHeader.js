import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {  Space, Checkbox, Popconfirm } from 'antd';
import { headerParamDictionary } from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable} from '../../../common/editTable';

// 请求头的可编辑表格
const RequestHeader = (props) =>{
    const { requestHeaderStore } = props;
    const {
        findRequestHeaderList,
        deleteRequestHeader,
        createRequestHeader,
        updateRequestHeader,
        requestHeaderList,
        setList,
        dataLength,
    } = requestHeaderStore;

    const [dataSource,setDataSource] = useState([]);
    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect( ()=>{
        findRequestHeaderList(apxMethodId).then(res=>setDataSource(res));
    },[dataLength])

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'headerName',
            width: '20%',
            render: (text, record)=>(
                <ExSelect
                    dictionary={headerParamDictionary}
                    defaultValue={record.headerName}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'headerName'}
                />
            )
        },{
            title: '必须',
            dataIndex: 'required',
            width: '6%',
            render:(text,record) =>  (
                <Checkbox defaultChecked={record.required} onChange={(value) => toggleChecked(value, record)}/>
            )
        },{
            title: '示例值',
            width: '20%',
            dataIndex: 'value',
            editable: true,
        }, {
            title: '说明',
            width: '30%',
            dataIndex: 'desc',
            editable: true,
        },{
            title: '操作',
            width: '10%',
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        }
    ]

    // 表格里checked
    const toggleChecked= (e,row)=> {
        let checked;
        if(e.target.checked){
            checked = 1
        }else{
            checked = 0
        }
        const data = {...row, required: checked}
        handleSave(data)
    }

    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'RequestHeaderInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteRequestHeader(record.id)}
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
            createRequestHeader(values)
        }
    }

    //更新
    const upData = (value) => {
        updateRequestHeader(value).then(res => setDataSource(res))
    }

    // 单元格保存数据
    const handleSave = (row) => {
        const newData = requestHeaderList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={requestHeaderList}
            handleSave={handleSave}
        />
    );
}

export default inject('requestHeaderStore')(observer(RequestHeader));
