/**
 * @description：
 * @date: 2021-07-29 17:53
 */

import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx';
import { Tooltip,  Space, Checkbox } from 'antd';
import {dataTypeDictionary } from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable} from "../../../common/editTable";

const JsonParamDS = (props) => {
    const { jsonParamDSStore, radioValue} = props;
    const {
        findJsonParamDSListTree,
        deleteJsonParamDS,
        createJsonParamDS,
        updateJsonParamDS,
        setList,
        addList,
        jsonParamDSList,
        setJsonParamDSListChild
    } = jsonParamDSStore;

    const [count, setCount] = useState(1);

    //表头
    const columns = [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '20%',
            // align:'center',
            editable: true,
        },
        {
            title: '数据类型',
            width: '10%',
            dataIndex: 'dataType',
            // align:'center',
            render: (text, record)=>(
                <ExSelect
                    dictionary={dataTypeDictionary}
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'dataType'}
                />
            )
        },
        {
            title: '必须',
            dataIndex: 'required',
            width: '10%',
            // align:'center',
            render:(text,record) =>  (
                <Checkbox defaultChecked={record.required} onChange={(value) => toggleChecked(value, record)}/>
            )
        },
        {
            title: '说明',
            width: '20%',
            dataIndex: 'description',
            // align:'center',
            editable: true,

        },
        {
            title: '操作',
            // align:'center',
            dataIndex: 'operation',
            width: '15%',
            render: (text, record, index) =>(
                <Space>
                    {record.dataType==='object'?<a onClick={() => addChild(record.dataType, record.id)}> 子</a>:''}
                    <Tooltip title="添加数据"><a onClick={() =>onCreated(record, index)} >添加 </a></Tooltip>
                    <Tooltip title="更新数据"><a onClick={() =>updateJsonParamDS(record)} > 更新 </a></Tooltip>
                    <Tooltip title="删除数据"><a onClick={() =>deleteJsonParamDS(record.id)} type="primary"> 删除 </a></Tooltip>
                    <Tooltip title="新增一行"><a onClick={() =>handleAdd()} >新行 </a></Tooltip>
                </Space>
            )
        }
    ]

    const dataStructureId = props.dataStructureId
    useEffect(()=>{
        findJsonParamDSListTree(dataStructureId);
    },[radioValue])

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


    // 点击子按钮，添加子行
    const addChild = (dataType, parentid) => {
        if(dataType === 'object'){
            // 调用store,显示子行
            setJsonParamDSListChild(parentid)
        }
    }

    // 点击保存按钮，添加
    const onCreated = (data) => {
        const values = data;
        values.dataStructure = {
            id: dataStructureId
        }
        createJsonParamDS(values);
        handleAdd;
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
        let result = loop(toJS(jsonParamDSList), [], row)
        setList(result)
    };


    return (
        <ExTable
            columns={columns}
            dataSource={jsonParamDSList}
            handleSave={handleSave}
        />
    );
}


export default inject('jsonParamDSStore')(observer(JsonParamDS));
