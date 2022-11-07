/*
 * @Description:  请求参数中From可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:47:43
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Checkbox, Popconfirm} from 'antd';
import {ExTable}from '../../../common/editTable';
import FileTextSelect from "../../../common/fileTextSelect";

const FormParam = (props) =>{
    const { formParamStore } = props;
    const {
        findFormParamList,
        deleteFormParam,
        createFormParam,
        updateFormParam,
        formParamList,
        setList,
        dataLength
    } = formParamStore;

    const [dataSource,setDataSource] =useState([])
    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect( ()=>{
        findFormParamList(apxMethodId).then(res => setDataSource(res));
    },[dataLength])

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: 240,
            editable: true,
        },{
            title: '示例值',
            width: 240,
            dataIndex: 'value',
            editable: true,
        },{
            title: '必须',
            dataIndex: 'required',
            width: 50,
            align:"center",
            render:(text,record) =>  (
                <Checkbox
                    defaultChecked={record.required}
                    onChange={(value) => toggleChecked(value, record)}
                />
            )
        },{
            title: '数据类型',
            width: 120,
            dataIndex: 'dataType',
            render: (text, record)=>(
                <FileTextSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                />
            )
        },{
            title: '说明',
            dataIndex: 'desc',
            editable: true,

        },{
            title: '操作',
            width: 200,
            dataIndex: 'operation',
            fixed: 'right',
            render: (text, record) =>(operation(record,dataSource))
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

    // const beforeUpload = ({fileList}) =>  false;
    //
    // const [fileList,setFileList] = useState([])
    //
    // const changeUpload = (e,record)=>{
    //     setFileList(e.fileList)
    //     let newData = {
    //         ...record,
    //         value:e.file
    //     }
    //     console.log(newData)
    // }

    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'FormParamInitRow'){
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
                            onConfirm={() =>deleteFormParam(record.id)}
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

    //更新
    const upData = (value) => {
        updateFormParam(value).then(res=>setDataSource(res));
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            delete values.id;
            createFormParam(values)
        }
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = formParamList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={formParamList}
            handleSave={handleSave}
        />
    );
}



export default inject('formParamStore')(observer(FormParam));
