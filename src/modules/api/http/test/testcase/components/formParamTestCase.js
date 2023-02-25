import React, {useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Popconfirm, Space} from 'antd';
import { mockValueDictionary } from '../../../../../common/dictionary/dictionary';
import ExSelect from "../../../../../common/exSelect";
import FileTextSelect from "../../../../../common/fileTextSelect";
import {ExTable} from "../../../../../common/editTable";
import IconCommon from "../../../../../common/iconCommon";


// 请求参数的可编辑表格
const FormParamTestCase = (props) =>{
    const { formParamTestCaseStore } = props;
    const { 
        findFormParamTestCaseList, 
        deleteFormParamTestCase, 
        createFormParamTestCase, 
        updateFormParamTestCase,
        formParamTestCaseList,
        setList,
        dataLength,
    } = formParamTestCaseStore;

    const [dataSource,setDataSource] = useState([]);
    const testCaseId =  localStorage.getItem('testCaseId');

    useEffect(()=>{
        findFormParamTestCaseList(testCaseId).then(res=>setDataSource(res));
    },[dataLength])

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '30%',
            editable: true,
        },
        {
            title: '数据类型',
            width: '20%',
            dataIndex: 'dataType',
            render: (text, record)=>(
                <FileTextSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                    setNewRowAction={setNewRowAction}
                />
            )
        },
        {
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
        },
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


    // colums 里的操作
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
                    onConfirm={() => deleteFormParamTestCase(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <IconCommon
                        icon={"shanchu3"}
                        className="icon-s table-edit-icon"
                    />
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
                                : <IconCommon
                                    icon={"btn_confirm"}
                                    className="icon-s table-edit-icon"
                                    onClick={() => upData(record)}
                                />
                        }
                    </>
                    :null
            )
        })
    }

    //更新
    const upData = (value) => {
        updateFormParamTestCase(value).then(res => setDataSource(res))
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return null
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createFormParamTestCase(values)
        }

        setNewRowAction(false)
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = formParamTestCaseList;
        const index = newData.findIndex((item) =>  row.id === item.id);
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
            dataSource={formParamTestCaseList}
            handleSave={handleSave}
        />
    ); 
}

export default inject('formParamTestCaseStore')(observer(FormParamTestCase));
