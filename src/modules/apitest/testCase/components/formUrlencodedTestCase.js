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

    const [dataSource,setDataSource] =useState([])
    const testCaseId =  localStorage.getItem('testCaseId');

    useEffect( ()=>{
        findFormUrlencodedTestCaseList(testCaseId).then(res => setDataSource(res));
    },[dataLength])

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '30%',
            editable: true,
        },{
            title: '数据类型',
            width: '20%',
            dataIndex: 'dataType',
            render: (text, record)=>(
                <DataTypeSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                    setNewRowAction={setNewRowAction}
                />
            )
        },{
            title: '参数值',
            width: '30%',
            dataIndex: 'value',
            render: (text, record)=>(
                <ExSelect
                    dictionary={mockValueDictionary}
                    defaultValue={record.value}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'value'}
                    setNewRowAction={setNewRowAction}
                />
            )
        },

        {
            title: '操作',
            width: '150',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        }
    ]

    //取消
    const onCancel = () =>{
        let data = {
            id:"InitNewRowId",
            "paramName":null,
            "dataType":null,
            "value":null
        }
        handleSave(data)

        //隐藏
        setNewRowAction(false)
    }

    const [newRowAction, setNewRowAction] = useState(false);

    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'InitNewRowId'){
            return <div className={`${newRowAction?"newRow-action-show":"newRow-action-hidden"}`}>
                <Space>
                    <a onClick={() =>onCreated(record)}> 保存</a>
                    <a onClick={()=>onCancel()}> 取消</a>
                </Space>
            </div>
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
                    <svg className="icon-s table-edit-icon" aria-hidden="true">
                        <use xlinkHref= {`#icon-shanchu3`} />
                    </svg>
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
        updateFormUrlencodedTestCase(value).then(res=>setDataSource(res));
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return null
        }else {
            delete values.id;
            createFormUrlencodedTestCase(values)
        }

        setNewRowAction(false)
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = formUrlencodedTestCaseList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)

        //如果是新行 操作 显示操作按钮
        if(row.id==="InitNewRowId"){
            newRowKeyDown()
        }
    };


    //当新行按键按下的时候显示后面的操作按钮
    const newRowKeyDown = () => {
        document.addEventListener('keydown', (e) =>{
            setNewRowAction(true)
        });
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
