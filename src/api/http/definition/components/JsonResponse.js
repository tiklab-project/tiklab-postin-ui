/*
 * @Description: 返回结果中Json的可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:58:08
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Table, Tooltip, Select, Space,Checkbox } from 'antd';
import { toJS } from 'mobx';
import {components, column, ExTable} from '../../../../common/EditTable';
import {dataTypeDictionary, mockValueDictionary} from '../../../../common/dictionary/dictionary';
import ExSelect from "../../../../common/ExSelect";
import DataTypeSelect from "../../../../common/DataTypeSelect";

const JsonResponse = (props) => {
    const { jsonResponseStore, radioValue } = props;
    const {
        findJsonResponseListTree,
        deleteJsonResponse,
        createJsonResponse,
        updateJsonResponse,
        setList,
        addList,
        jsonResponseList,
        setJsonResponseListChild
    } = jsonResponseStore;

    const [count, setCount] = useState(1);

    //表头
    const columns = [
        {
            title: '参数名称',
            dataIndex: 'propertyName',
            width:  "20%",
            // align:'center',
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
            align:'center',
            render:(text,record) =>  (
                <Checkbox
                    defaultChecked={record.required}
                    onChange={(value) => toggleChecked(value, record)}
                />
            )
        },
        {
            title: '数据类型',
            width: 120,
            dataIndex: 'dataType',
            // align:'center',
            render: (text, record)=>(
                <DataTypeSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                />
            )
        },
         {
            title: '说明',
            dataIndex: 'desc',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width:  "20%",
            fixed: 'right',
            render: (text, record, index) =>(
                <Space>
                    <Tooltip title="数据类型: object，添加子行"><a onClick={() => addChild(record.dataType,record.id)}> 子</a></Tooltip>
                    <Tooltip title="添加数据"><a onClick={() =>onCreated(record, index)} >添加 </a></Tooltip>
                    <Tooltip title="更新数据"><a onClick={() =>updateJsonResponse(record)} > 更新 </a></Tooltip>
                    <Tooltip title="删除数据"><a onClick={() =>deleteJsonResponse(record.id)} type="primary"> 删除 </a></Tooltip>
                    <Tooltip title="新增一行"><a onClick={() =>handleAdd()} > 新行</a></Tooltip>
                    {/* <Button shape="circle">上</Button>
                    <Button shape="circle">下</Button> */}
                </Space>
            )
        },
    ]

    const apxMethodId =  localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findJsonResponseListTree(apxMethodId)
    },[radioValue])

    // 表格checked
    const toggleChecked= (e,row)=> {
        let checked = '';
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


    // 点击子按钮，添加子行
    const addChild = (dataType,  parentid) => {
        if(dataType === 'object'){
            // 调用store,显示子行
            setJsonResponseListChild(parentid)
        }
    }

    // 点击保存按钮，添加
    const onCreated = (data) => {
        const values = data;
        delete values.id;
        values.method = {
            id: apxMethodId
        }
        createJsonResponse(values)

    }

    // 添加下一行
    const handleAdd = () => {
        const newData = [{
            id: count
        }];
        setCount(count+1);
        addList(newData)
    };


    // 递归数据
    const loop = (data, result=[], row) => {
        const parentId = row.parent && row.parent.id;
        // 没有parentid
        if(!parentId) {
            result = data.map(item => {
                if(item.id === row.id) {
                    return {...item, ...row}
                }
                return item
            })
        } else {
            data.forEach((item, index) => {
                if(item.id && item.id === row.id) {
                    result.push({
                        ...row,
                        children:item.children ? [] : null
                    })
                } else {
                    result.push({
                        ...item,
                        children:item.children ? [] : null
                    })
                }
                if(item.children && item.children.length > 0) {
                    loop(item.children, result[index].children, row)
                }
            });
        }
        return result
    }


    // 编辑单元格，保存数据
    const handleSave = (row) => {
        let result = loop(toJS(jsonResponseList), [], row)
        setList(result)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={jsonResponseList}
            handleSave={handleSave}
        />
    );
}

export default inject('jsonResponseStore')(observer(JsonResponse));
