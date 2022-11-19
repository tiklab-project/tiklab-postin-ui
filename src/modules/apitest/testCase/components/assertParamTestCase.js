import React, {useEffect, useState} from 'react';
import {observer, inject} from "mobx-react";
import {Space, Select, Popconfirm} from 'antd';
import {ExTable} from "../../../common/editTable";
import IconCommon from "../../../common/iconCommon";

const { Option } = Select;

// 请求参数的可编辑表格
const AssertParamTestCase = (props) =>{
    const { assertParamTestCaseStore } = props;
    const {
        findAssertParamTestCaseList,
        deleteAssertParamTestCase,
        createAssertParamTestCase,
        updateAssertParamTestCase,
        setList,
        assertParamTestCaseList,
        dataLength
    } = assertParamTestCaseStore;

    const [dataSource,setDataSource] = useState([]);
    const testCaseId =  localStorage.getItem('testCaseId') ;

    useEffect( ()=>{
        findAssertParamTestCaseList(testCaseId).then(res=>setDataSource(res));
    },[dataLength])


    let columns= [
        {
            title: '来源',
            dataIndex: 'source',
            width: '20%',
            render:(text,record) =>  (
                <Select
                    defaultValue={record.source}
                    allowClear
                    bordered={false}
                    style={{'width':"100%"}}
                    onSelect= {(e) => onSelect(e,record)}
                >
                    <Option value={1}>状态码</Option>
                    <Option value={2}>响应头</Option>
                    <Option value={3}>响应体</Option>
                </Select>
            )
        },
        {
            title: '属性名称',
            dataIndex: 'propertyName',
            width: '25%',
            editable: true,
        },
        {
            title: '比较符',
            width: '10%',
            dataIndex: 'comparator',
            editable: true,

        },
        {
            title: '参数值',
            width: '25%',
            dataIndex: 'value',
            editable: true,

        },
        {
            title: '操作',
            width: '150',
            // align:'center',
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        },
    ]

    // 表格select选择事件
    const onSelect = (value, row) => {
        const data = {
            ...row,
            source: value
        }
        handleSave(data);

        setNewRowAction(true)
    }

    //取消
    const onCancel = () =>{
        let data = {
            "id":"InitNewRowId",
            "source":null,
            "propertyName":null,
            "comparator":null,
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
                    onConfirm={() => deleteAssertParamTestCase(record.id)}
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
                            item.source === record.source
                            && item.propertyName === record.propertyName
                            && item.comparator === record.comparator
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
        updateAssertParamTestCase(value).then(res => setDataSource(res))
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return null
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createAssertParamTestCase(values)
        }

        setNewRowAction(false)
    }

    // 保存数据
    const handleSave = (row) => {
        const newData =assertParamTestCaseList;
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
        <ExTable
            columns={columns}
            dataSource={assertParamTestCaseList}
            handleSave={handleSave}
        />
    );
}

export default inject('assertParamTestCaseStore')(observer(AssertParamTestCase));
