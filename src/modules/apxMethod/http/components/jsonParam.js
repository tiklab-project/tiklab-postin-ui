/*
 * @Description: 请求参数中Json的可编辑表格组件
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:56:56
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx';
import {Tooltip,  Space, Checkbox} from 'antd';
import {mockValueDictionary} from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable} from '../../../common/editTable';
import DataTypeSelect from "../../../common/dataTypeSelect";

const JsonParam = (props) => {
    const { jsonParamStore, radioValue} = props;
    const {
        findJsonParamListTree,
        deleteJsonParam,
        createJsonParam,
        updateJsonParam,
        setList,
        addList,
        jsonParamList,
        setJsonParamListChild
    } = jsonParamStore;

    //表头
    const columns = [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '18%',
            // align:'center',
            editable: true,
        },
        {
            title: '数据类型',
            width: '8%',
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
            title: '必须',
            dataIndex: 'required',
            width: '6%',
            // align:'center',
            render:(text,record) =>  (
                <Checkbox defaultChecked={record.required} onChange={(value) => toggleChecked(value, record)}/>
            )
        },
        {
            title: '示例值',
            width: '20%',
            dataIndex: 'value',
            // align:'center',
            render: (text, record)=>(
                <ExSelect
                    dictionary={mockValueDictionary}
                    defaultValue={record.value}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'value'}
                />
            )

        },{
            title: '说明',
            width: '25%',
            dataIndex: 'desc',
            // align:'center',
            editable: true,

        },
        {
            title: '操作',
            // align:'center',
            dataIndex: 'operation',
            render: (text, record, index) =>(
                <Space>
                    <Tooltip title="数据类型: object，添加子行"><a onClick={() => addChild(record.dataType,record.id)}> 子</a></Tooltip>
                    <Tooltip title="添加数据"><a onClick={() =>onCreated(record, index)} >create </a></Tooltip>
                    <Tooltip title="更新数据"><a onClick={() =>updateJsonParam(record)} > update </a></Tooltip>
                    <Tooltip title="删除数据"><a onClick={() =>deleteJsonParam(record.id)} type="primary"> delete </a></Tooltip>
                    <Tooltip title="新增一行"><a onClick={() =>handleAdd()} > + </a></Tooltip>
                    {/* <Button shape="circle">上</Button>
                    <Button shape="circle">下</Button> */}
                </Space>
            )
        }
    ]


    const [count, setCount] = useState(1);
    // 添加下一行
    const handleAdd = () => {
        const newData = [{
            id: count
        }];
        setCount(count+1);
        addList(newData)
    };

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

    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findJsonParamListTree(apxMethodId);
    },[radioValue])


    // 点击子按钮，添加子行
    const addChild = (dataType, parentid) => {
        if(dataType === 'object'){
            // 调用store,显示子行
            setJsonParamListChild(parentid)
        }
    }

    // 点击保存按钮，添加
    const onCreated = (data) => {
        const values = data;
        values.method = {
            id: apxMethodId
        }
        createJsonParam(values);
    }


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
        let result = loop(toJS(jsonParamList), [], row)
        setList(result)
    };

    // const onExpandIcon = ({ expanded, onExpand, record })=>{
    //     if(record.children &&record.children.length > 0){
    //         if (expanded) {
    //             return <a onClick={e =>onExpand(record, e)}><MinusCircleTwoTone /></a>
    //         } else {
    //             return <a onClick={e =>onExpand(record, e)}><PlusCircleTwoTone /></a>
    //         }
    //     }else{
    //         return <span style={{marginRight:8 }}></span>
    //     }
    // }

    return (
        <ExTable
            columns={columns}
            dataSource={jsonParamList}
            handleSave={handleSave}
        />
    );
}


export default inject('jsonParamStore')(observer(JsonParam));
