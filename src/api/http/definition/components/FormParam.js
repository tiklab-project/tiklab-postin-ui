import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import {Space, Checkbox, Popconfirm} from 'antd';
import {ExTable}from '../../../../common/EditTable';
import FileTextSelect from "../../../../common/FileTextSelect";
import IconCommon from "../../../../common/IconCommon";
import formParamStore from "../store/FormParamStore";
/**
 * 定义
 * http
 * From可编辑表格
 */
const FormParam = (props) =>{
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
    const apiId = localStorage.getItem('apiId');

    useEffect( ()=>{
        findFormParamList(apiId).then(res => setDataSource(res));
    },[dataLength])

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width:  "20%",
            editable: true,
        },{
            title: '示例值',
            width:  "20%",
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
            width:  "20%",
            dataIndex: 'operation',
            fixed: 'right',
            render: (text, record) =>(operation(record,dataSource))
        }
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
                                :  <IconCommon
                                    icon={"btn_confirm"}
                                    className="icon-s table-edit-icon"
                                    onClick={() => upData(record)}
                                />
                        }
                        <Popconfirm
                            title="确定删除？"
                            onConfirm={() =>deleteFormParam(record.id)}
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

    /**
     * 更新
     */
    const upData = (value) => {
        updateFormParam(value).then(()=> {
            findFormParamList(apiId).then(res => setDataSource(res));
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
            createFormParam(values)
        }

        setNewRowAction(false)
    }

    /**
     * 保存数据
     */
    const handleSave = (row) => {
        const newData = formParamList;
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
            dataSource={formParamList}
            handleSave={handleSave}
        />
    );
}



export default observer(FormParam);
