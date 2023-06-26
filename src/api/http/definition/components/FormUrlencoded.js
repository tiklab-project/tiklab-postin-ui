import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Checkbox, Popconfirm, Select} from 'antd';
import { mockValueDictionary} from '../../../../common/dictionary/dictionary';
import ExSelect from "../../../../common/ExSelect";
import {ExTable}from '../../../../common/EditTable';
import DataTypeSelect from "../../../../common/DataTypeSelect";
import IconCommon from "../../../../common/IconCommon";
import formUrlencodedStore from "../store/FormUrlencodedStore";
/**
 * 定义
 * http
 * FormUrlencoded可编辑表格
 */
const FormUrlencoded = (props) =>{

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
            width: "20%",
            editable: true,
        },{
            title: '示例值',
            width:  "20%",
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
                <DataTypeSelect
                    defaultValue={text}
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
            dataIndex: 'operation',
            width:  "20%",
            fixed: 'right',
            render: (text, record,index) =>(operation(record,dataSource))
        },
        
    ]

    /**
     * 表格checked
     */
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

    /**
     * 取消编辑
     */
    const onCancel = () =>{
        let data = {
            id:"InitNewRowId",
            "paramName":null,
            "value":null,
            "required":1,
            "dataType":null,
            "desc":null
        }

        handleSave(data)

        //隐藏
        setNewRowAction(false)
    }

    const [newRowAction, setNewRowAction] = useState(false);

    /**
     * 表格里的操作列展示
     */
    const operation = (record,data) => {
        if(record.id === 'InitNewRowId'){
            return <div className={`${newRowAction?"newRow-action-show":"newRow-action-hidden"}`}>
                <Space>
                    <a onClick={() =>onCreated(record)}> 保存</a>
                    <a onClick={()=>onCancel()}> 取消</a>
                </Space>
            </div>
        }else{
            return data&&data.map((item) => {
                return (
                    item.id === record.id
                        ?<Space key={item.id}>
                            {
                                item.paramName === record.paramName
                                && item.dataType === record.dataType
                                && item.required === record.required
                                && item.desc === record.desc
                                && item.value === record.value
                                    ?null
                                    : <IconCommon
                                        icon={"btn_confirm"}
                                        className="icon-s table-edit-icon"
                                        onClick={() => upData(record)}
                                    />
                            }
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={() =>deleteFormUrlencoded(record.id)}
                                okText='确定'
                                cancelText='取消'
                            >
                                <IconCommon
                                    icon={"shanchu3"}
                                    className="icon-s table-edit-icon"
                                />
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

    /**
     * 更新
     */
    const upData = (value) => {
        updateFormUrlencoded(value).then(()=>{
            findFormUrlencodedList(apxMethodId).then(res => setDataSoure(res));
        });
    }

    /**
     * 添加
     */
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return null
        }else {
            delete values.id;
            createFormUrlencoded(values)
        }

        setNewRowAction(false)
    }

    /**
     * 保存数据
     */
    const handleSave = (row) => {
        const newData = [...formUrlencodedList];
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)

        //如果是新行 操作 显示操作按钮
        if(row.id==="InitNewRowId"){
            document.addEventListener('keydown', (e) =>{
                setNewRowAction(true)
            });
        }
    };

    return (
        <ExTable
            columns={columns}
            dataSource={formUrlencodedList}
            handleSave={handleSave}
        />
    );

}



export default observer(FormUrlencoded);
