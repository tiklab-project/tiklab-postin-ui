/*
 * @Description: 请求参数中query可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-10 09:08:21
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Checkbox, Popconfirm} from 'antd';
import { mockValueDictionary } from '../../../../common/dictionary/dictionary';
import ExSelect from "../../../../common/ExSelect";
import {ExTable} from '../../../../common/EditTable';

const QueryParam = (props) =>{
    const { queryParamStore } = props;
    const {
        findQueryParamList,
        deleteQueryParam,
        createQueryParam,
        updateQueryParam,
        queryParamList,
        setList,
        dataLength,
    } = queryParamStore;

    const [dataSource,setDataSource] = useState([])
    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect( ()=>{
        findQueryParamList(apxMethodId).then(res=>setDataSource(res))
    },[dataLength])

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
            title: '说明',
            dataIndex: 'desc',
            editable: true,

        },
        {
            title: '操作',
            dataIndex: 'operation',
            width:  "20%",
            fixed: 'right',
            render: (text, record) =>(operation(record,dataSource))
        },

    ]

    // 必须项的checked
    const toggleChecked = (e,row) => {
        let checked;
        if(e.target.checked){
            checked = 1
        }else{
            checked = 0
        }
        const data = {...row,  required: checked}

        handleSave(data)
    }

    //取消
    const onCancel = () =>{
        let data = {
            id:"InitNewRowId",
            "paramName":null,
            "value":null,
            "required":1,
            "desc":null
        }
        handleSave(data)

        //隐藏
        setNewRowAction(false)
    }

    const [newRowAction, setNewRowAction] = useState(false);


    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'InitNewRowId'){
            return  <div className={`${newRowAction?"newRow-action-show":"newRow-action-hidden"}`}>
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
                    onConfirm={() => deleteQueryParam(record.id)}
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
                            && item.required === record.required
                            && item.desc === record.desc
                            && item.value === record.value
                                ? null
                                : <svg className="icon-s table-edit-icon" aria-hidden="true" onClick={() => upData(record)}>
                                    <use xlinkHref= {`#icon-btn_confirm`} />
                                </svg>
                        }
                    </>
                    :null
            )
        })
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return null;
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createQueryParam(values)
        }

        setNewRowAction(false)
    }

    //更新
    const upData = (value) => {
        updateQueryParam(value).then(res=>setDataSource(res))
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = queryParamList;
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
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>查询参数</span></div>
            <ExTable
                columns={columns}
                dataSource={queryParamList}
                handleSave={handleSave}
            />
        </>

    );
}


export default inject('queryParamStore')(observer(QueryParam));
