import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Tooltip, Select, Space } from 'antd';
import { toJS } from 'mobx';
import { mockValueDictionary } from '../../../common/dictionary/dictionary';
import FileTextSelect from "../../../common/fileTextSelect";
import ExSelect from "../../../common/exSelect";
import {ExTable} from "../../../common/editTable";

const { Option } = Select;

// 请求参数的可编辑表格组件
const JsonParamTestCase = (props) => {
    const { jsonParamTestCaseStore, radioValue } = props;
    const { 
        findJsonParamTestCaseListTree, 
        deleteJsonParamTestCase, 
        createJsonParamTestCase, 
        updateJsonParamTestCase, 
        setList, 
        addList, 
        jsonParamTestCaseList, 
        setJsonParamTestCaseListChild,
    } = jsonParamTestCaseStore;
   
    const [count, setCount] = useState(1);    
    const columns = [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '20%',
            editable: true,
        },
        {
            title: '数据类型',
            width: '15%',
            dataIndex: 'dataType',
            render: (text, record)=>(
                <FileTextSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                />
            )
        },
        {
            title: '参数值',
            width: '20%',
            dataIndex: 'value',
            render: (text, record)=>(
                <ExSelect
                    dictionary={mockValueDictionary}
                    defaultValue={record.value}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'value'}
                />
            )
            
        },
        {
            title: '操作',
            fixed: 'right',
            align:'center',
            width: '20%',
            dataIndex: 'operation',
            render: (text, record, index) =>(
                <Space>
                    <Tooltip title="数据类型: object，添加子行"><a onClick={() => addChild(record.dataType,record.id)}> 子</a></Tooltip>
                    <Tooltip title="添加数据"><a onClick={() =>onCreated(record, index)} >添加 </a></Tooltip>
                    <Tooltip title="更新数据"><a onClick={() =>updateJsonParamTestCase(record)} > 编辑 </a></Tooltip>
                    <Tooltip title="删除数据"><a onClick={() =>deleteJsonParamTestCase(record.id)} type="primary"> 删除 </a></Tooltip>
                    <Tooltip title="新增一行"><a onClick={() =>handleAdd()} > 新行 </a></Tooltip>
                    
                    {/* <Button shape="circle">上</Button>
                    <Button shape="circle">下</Button> */}
                </Space> 
            ) 
        },
        {
            title: '',
            width: '20%',
            dataIndex: 'none',
        }
    ]
    
    const testCaseId =  localStorage.getItem('testCaseId') ;
    useEffect(()=>{
        findJsonParamTestCaseListTree(testCaseId);
    },[radioValue])


    // 点击子按钮，添加子行
    const addChild = (dataType, parentid) => {
        // debugger
        if(dataType === 'object'){
            // 调用store,显示子行
            setJsonParamTestCaseListChild(parentid)
        }
    }

    // 点击保存按钮，添加
    const onCreated = (values) => {
        createJsonParamTestCase(values);
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
        let result = loop(toJS(jsonParamTestCaseList), [], row)
        setList(result)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={jsonParamTestCaseList}
            handleSave={handleSave}
        />
    );
}


export default inject('jsonParamTestCaseStore')(observer(JsonParamTestCase));
