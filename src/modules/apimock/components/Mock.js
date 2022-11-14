import React, { Fragment, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Space, Tooltip, Popconfirm,Switch} from 'antd';
import MockEdit from './mockEdit';
import './mock.scss';
import copyMockUrl from "../../common/copyLink";

// 接口的Mock
const Mock = (props) => {
    const { mockStore } = props
    const { findMockPage, deleteMock,updateMock, mockList } = mockStore
    const columns = [
        {
            title: '启用',
            dataIndex: 'enable',
            key: 'enable',
            width:'5%',
            render:(text,record )=>(
                <Switch
                    checkedChildren="启用"
                    unCheckedChildren="停用"
                    checked={text === 1}
                    onChange={(e)=>changeEnable(e,record)}
                />
            )
        },{
            title: 'Mock名称',
            dataIndex: 'name',
            key: 'name',
            width:'20%',
            render:(text,record)=>(
                <a onClick = {()=>setLocalStorage('mockId',record.id)}>{text}</a>
            )
        },
        {
            title: '创建人',
            dataIndex: ['createUser','name'],
            key: 'createUser',
            width:'10%',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width:'15%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:'15%',
            render: (text, record )=>(
                <Space  size="middle">

                    <MockEdit type="edit"  name={"编辑"}  {...props } mockId={record.id}/>

                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteMock(record.id).then(()=>findMockPage(apxMethodId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <svg className="icon-s edit-icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-shanchu3`} />
                        </svg>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const workspaceId = localStorage.getItem("workspaceId")
    const apxMethodId =  localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findMockPage(apxMethodId)
    },[apxMethodId])

    const changeEnable = (e,record) => {
        if(e===true){
            record.enable=1;
        }else {
            record.enable=0;
        }
        updateMock(record)
    }

    const setLocalStorage = (mockId,id) => {
        localStorage.setItem(mockId,id)
        props.history.push('/workspace/apis/detail/interface/mockdetail')
    }

    let mockUrl ;

    if(base_url==="/"){
        mockUrl = `${window.location.host}/mockx/`+workspaceId;
    }else {
        mockUrl = `${base_url}/mockx/`+workspaceId;
    }

    return (
        <div className={"content-box-center"}>
            <div >
                <div className='mock-header'>
                    <div
                        id={"link"}
                        onClick={()=>copyMockUrl("link")}
                        style={{display:"flex",justifyContent:"space-between",cursor:"pointer"}}
                    >
                        <Tooltip title="点击复制">
                            <span>调用地址：{mockUrl}</span>
                        </Tooltip>
                    </div>
                    <MockEdit btn="btn"  name={"+添加MOCK"} {...props }/>
                </div>
                <div className={"out-table-box"}>
                    <Table
                        columns={columns}
                        dataSource={mockList}
                        rowKey = {record => record.id}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('mockStore')(observer(Mock));
