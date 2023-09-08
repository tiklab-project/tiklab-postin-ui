import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {Table, Space, Tooltip, Popconfirm, Switch, Breadcrumb} from 'antd';
import MockEdit from './MockEdit';
import './mock.scss';
import copyMockUrl from "../../../../common/copyLink";

import EnvSelect from "../../../../support/environment/components/EnvSelect";
import mockStore from "../store/MockStore";
/**
 * 接口的Mock列表页
 */
const Mock = (props) => {
    const { findMockPage, deleteMock,updateMock, mockList } = mockStore
    const columns = [
        {
            title: 'Mock名称',
            dataIndex: 'name',
            key: 'name',
            width:'20%',
            render:(text,record)=>(
                <a onClick = {()=>setLocalStorage('mockId',record.id)}>{text}</a>
            )
        },
        {
            title: '启用',
            dataIndex: 'enable',
            key: 'enable',
            width:'10%',
            render:(text,record )=>(
                <Switch
                    checked={text===1}
                    checkedChildren="启用"
                    unCheckedChildren="停用"
                    onChange={(e)=>changeEnable(e,record)}
                />
            )
        },
        {
            title: '创建人',
            dataIndex: ['createUser','name'],
            key: 'createUser',
            width:'20%',
            render: (text, record) => (
                <div className={"ws-user-item"}>
                    <Space>
                        {/*<Profile userInfo={record.createUser}/>*/}
                        <span>{record.createUser?.nickname} </span>
                    </Space>
                </div>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width:'20%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:'10%',
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

    /**
     * 列表中的是否可以切换
     */
    const changeEnable = (e,record) => {
        if(e===true){
            record.enable=1;
        }else {
            record.enable=0;
        }
        updateMock(record).then(()=>findMockPage(apxMethodId))
    }

    /**
     * 去往mock详情页
     */
    const setLocalStorage = (mockId,id) => {
        localStorage.setItem(mockId,id)
        props.history.push('/workspace/apis/content/mock-detail')
    }

    /**
     * 去往接口列表页
     */
    const goToListPage = () =>{
        props.history.push("/workspace/apis/category")
    }

    /**
     * 去往接口文档页
     */
    const goToDocPage = () =>{
        props.history.push("/workspace/apis/content/document")
    }


    let mockUrl;

    if(base_url==="/"){
        mockUrl = `${window.location.origin}/mockx/`+workspaceId;
    }else {
        mockUrl = `${base_url}/mockx/`+workspaceId;
    }

    return (
        <div className={"content-margin"} style={{height:" calc(100% - 48px)",padding:"0"}}>
            <div className="content-margin-box">
                <div className='mock-header'>
                    <div style={{display:"flex",justifyContent:"space-between",cursor:"pointer"}}>
                        MOCK地址：
                        <Tooltip title="点击复制">
                            <span
                                id={"link"}
                                onClick={()=>copyMockUrl("link")}
                            >
                                {mockUrl}
                            </span>
                        </Tooltip>
                    </div>
                    <MockEdit btn="btn"  name={"+添加MOCK"} {...props }/>
                </div>
                <div className={"pi-list-box"}>
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

export default observer(Mock);
