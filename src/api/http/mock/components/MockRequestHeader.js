import React, {  useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Popconfirm} from 'antd';
import {headerParamDictionary} from "../../../../common/dictionary/dictionary";
import ExSelect from "../../../../common/ExSelect";
import {ExTable} from "../../../../common/EditTable";
import IconCommon from "../../../../common/IconCommon";
import mockRequestHeaderStore from "../store/MockRequestHeaderStore";

/**
 * mock
 * 请求头可编辑表格
 */
const RequestHeaderMock = (props) =>{
    const { 
        findRequestHeaderMockList, 
        deleteRequestHeaderMock, 
        createRequestHeaderMock, 
        updateRequestHeaderMock,
        dataLength,
        setList,
        mockRequestHeaderList 
    } = mockRequestHeaderStore;

    const [dataSource,setDataSource] = useState([])
    const mockId = localStorage.getItem('mockId')

    useEffect( ()=>{
        findRequestHeaderMockList(mockId).then(res=>setDataSource(res));
    },[dataLength])

    let columns= [
        {
            title: '属性名称',
            dataIndex: 'headerName',
            width: '40%',
            render: (text, record)=>(
                <ExSelect
                    dictionary={headerParamDictionary}
                    defaultValue={record.headerName}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'headerName'}
                    setNewRowAction={setNewRowAction}
                />
            )
        },
        {
            title: '属性值',
            width: '40%',
            dataIndex: 'value',
            editable: true,
        },
        {
            title: '操作',
            width: '100',
            dataIndex: 'operation',
            render: (text, record) =>( operation(record,dataSource) )
        }
    ]

    /**
     * 取消编辑
     */
    const onCancel = () =>{
        let data = {
            id:"InitNewRowId",
            "headerName":null,
            "value":null
        }
        handleSave(data)

        //新行隐藏后面操作按钮
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
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteRequestHeaderMock(record.id)}
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

    /**
     * 本地编辑的值和返回的值比较，不想同的会显示更新按钮
     */
    const updateView = (record,data)=>{
        return data&&data.map((item) => {
            return (
                item.id === record.id
                    ?<>
                        {
                            item.headerName === record.headerName
                            && item.value === record.value
                                ? null
                                :  <IconCommon
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

    /**
     * 更新
     */
    const upData = (value) => {
        updateRequestHeaderMock(value).then(res => setDataSource(res))
    }

    /**
     * 添加
     */
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return null
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createRequestHeaderMock(values)
        }

        setNewRowAction(false)
    }

    /**
     * 保存数据
     */
    const handleSave = (row) => {
        let newData = mockRequestHeaderList;
        //获取当前行对应的下标
        let index = newData.findIndex((item) => row.id === item.id);
        //替换上一次录入的数据
        newData.splice(index, 1, { ...newData[index], ...row });

        setList(newData);

        //如果是新行 操作 显示操作按钮
        if(row.id==="InitNewRowId"){
            newRowKeyDown()
        }
    };

    /**
     *  当新行按键按下的时候显示后面的操作按钮
     */
    const newRowKeyDown = () => {
        document.addEventListener('keydown', (e) =>{
            setNewRowAction(true)
        });
    };

    return (
        <ExTable
            columns={columns}
            handleSave={handleSave}
            dataSource={mockRequestHeaderList}
        />
    ); 
}

export default observer(RequestHeaderMock);
