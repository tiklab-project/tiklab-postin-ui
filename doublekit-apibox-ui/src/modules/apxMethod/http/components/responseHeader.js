import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Table, Space, Checkbox, Popconfirm} from 'antd';
import {components, column, ExTable} from '../../../common/editTable'

// 请求参数的可编辑表格
const ResponseHeader = (props) =>{
    const { responseHeaderStore } = props;
    const {
        findResponseHeaderList,
        deleteResponseHeader,
        createResponseHeader,
        updateResponseHeader,
        setList,
        responseHeaderList,
        responseHeaderDataSource,
        dataLength
    } = responseHeaderStore;

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'headerName',
            width: '20%',
            // align:'center',
            editable: true,
        },
        {
            title: '必须',
            dataIndex: 'required',
            width: '6%',
            // align:'center',
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
            // align:'center',
            editable: true,
        },{
            title: '说明',
            width: '25%',
            dataIndex: 'desc',
            // align:'center',
            editable: true,
        },
        {
            title: '操作',
            width: '10%',
            // align:'center',
            dataIndex: 'operation',
            render: (text, record,index) =>(operation(record,dataSource))
        }
    ]


    // 表格checked
    const toggleChecked= (e,row)=> {
        let checked ;
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
        if(record.id === 'ResponseHeaderInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return data&&data.map((item) => {
                return (
                    item.id === record.id
                    ?<Space key={item.id}>
                        {
                            item.headerName === record.headerName
                            && item.required === record.required
                            && item.desc === record.desc
                            && item.value === record.value
                                ?null
                                :<a onClick={() =>upData(record)}>更新</a>
                        }
                        <Popconfirm
                            title="确定删除？"
                            onConfirm={() =>deleteResponseHeader(record.id)}
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

    const [dataSource,setDataSource] = useState([])

    const apxMethodId =  localStorage.getItem('apxMethodId');

    useEffect( ()=>{
        findResponseHeaderList(apxMethodId).then(res=>setDataSource(res))
    },[dataLength])

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createResponseHeader(values)
        }
    }

    const upData = (value) => {
        updateResponseHeader(value).then(res => setDataSource(res))
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = responseHeaderList;
        const index = newData.findIndex((item) =>row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={responseHeaderList}
            handleSave={handleSave}
        />
    );
}


export default inject('responseHeaderStore')(observer(ResponseHeader));
