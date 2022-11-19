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
            width: '40%',
            editable: true,
        },{
            title: '参数值',
            width: '40%',
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
                dataSource={queryParamTestCaseList}
                handleSave={handleSave}
            />
        </>

    ); 
}


export default inject('queryParamTestCaseStore')(observer(QueryParamTestCase));
