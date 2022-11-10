
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Space, Popconfirm} from 'antd';
import ExSelect from "../../common/exSelect";
import {headerParamDictionary} from "../../common/dictionary/dictionary";
import {ExTable} from "../../common/editTable";

const MockResponseHeader = (props) => {
    const { mockResponseHeaderStore } = props;
    const {
        findResponseHeaderMockList,
        deleteResponseHeaderMock,
        createResponseHeaderMock,
        updateResponseHeaderMock,
        dataLength,
        setList,
        mockResponseHeaderList
    } = mockResponseHeaderStore;

    const [dataSource,setDataSource] = useState([])
    const mockId = localStorage.getItem('mockId')

    useEffect( ()=>{
        findResponseHeaderMockList(mockId).then(res=>setDataSource(res));
    },[dataLength])

    let columns= [
        {
            title: '标签',
            dataIndex: 'headerName',
            width: '25%',
            render: (text, record)=>(
                <ExSelect
                    dictionary={headerParamDictionary}
                    defaultValue={record.headerName}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'headerName'}
                />
            )
        },
        {
            title: '值',
            width: '50%',
            dataIndex: 'value',
            editable: true,
        },
        {
            title: '操作',
            width: '10%',
            dataIndex: 'operation',
            render: (text, record) =>( operation(record,dataSource) )
        }
    ]

    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'mockResponseHeaderInitRow'){
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
                    onConfirm={() => deleteResponseHeaderMock(record.id)}
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
                            item.headerName === record.headerName
                            && item.value === record.value
                                ? null
                                : <a onClick={() => upData(record)}>更新</a>
                        }
                    </>
                    :null
            )
        })
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createResponseHeaderMock(values)
        }
    }

    //更新
    const upData = (value) => {
        updateResponseHeaderMock(value).then(res => setDataSource(res))
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = mockResponseHeaderList;
        const index = newData.findIndex((item) =>  row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData);
    };

    return (
        <ExTable
            columns={columns}
            handleSave={handleSave}
            dataSource={mockResponseHeaderList}
        />
    );
}

export default inject('mockResponseHeaderStore')(observer(MockResponseHeader));
