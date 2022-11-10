import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Popconfirm, Space} from 'antd';
import { mockValueDictionary } from '../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable} from "../../../common/editTable";


// 请求参数的可编辑表格
const QueryParamTestCase = (props) =>{
    const { queryParamTestCaseStore } = props;
    const { 
        findQueryParamTestCaseList, 
        deleteQueryParamTestCase, 
        createQueryParamTestCase, 
        updateQueryParamTestCase,
        queryParamTestCaseList,
        dataLength,
        setList,
    } = queryParamTestCaseStore;

    const [dataSource,setDataSource] = useState([])
    const testCaseId =  localStorage.getItem('testCaseId');

    useEffect( ()=>{
        findQueryParamTestCaseList(testCaseId).then(res => setDataSource(res));
    },[dataLength])

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '20%',
            editable: true,
        },{
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
            
        },{
            title: '操作',
            width: '15%',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        },
        {
            title: '',
            width: '25%',
            dataIndex: 'none',
        }
    ]

    // colums 里的操作
    const operation = (record,data) => {
        if(record.id === 'QueryParamTestCaseInitRow'){
            return <svg className={"icon-s table-edit-icon"} aria-hidden="true" onClick={() =>onCreated(record)} >
                        <use xlinkHref= {`#icon-tianjia-`} />
                    </svg>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteQueryParamTestCase(record.id)}
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
        updateQueryParamTestCase(value).then(res => setDataSource(res))
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createQueryParamTestCase(values);
        }
    }

    // 保存数据
    const handleSave = (row) => {
        const newData =queryParamTestCaseList;
        const index = newData.findIndex((item) => row.id === item.id);

        newData.splice(index, 1, { ...newData[index], ...row });

        setList(newData)
    };

  
    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>查询参数</span></div>
            <ExTable
                columns={columns}
                dataSource={queryParamTestCaseList}
                handleSave={handleSave}
            />
        </>

    ); 
}


export default inject('queryParamTestCaseStore')(observer(QueryParamTestCase));
