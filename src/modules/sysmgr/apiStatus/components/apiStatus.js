import React, {Fragment, useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Popconfirm, Tooltip, Row, Col} from 'antd';
import ApiStatusEdit from "./apiStatusEdit";

const ApiStatus = (props) => {
    const { apxMethodStatusStore } = props;
    const {
        findApiStatusPage,
        apiStatusList,
        deleteApiStatus,
        totalRecord
    } = apxMethodStatusStore;

    const columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            align:"center",
            width:"30%",
        },
        {
            title: "编码",
            dataIndex: "code",
            key: "code",
            align:"center",
            width:"30%",
        },
        {
            title: "类型",
            dataIndex: "type",
            key: "type",
            align:"center",
            width:"20%",
            render:(text,record)=>text==="system"?"系统":"自定义"
        },
        {
            title: "操作",
            key: "action",
            align:"center",
            width:"20%",
            render: (text, record) => (actionView(record)),
        },
    ]

    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    useEffect(()=> {
        findApiStatusPage(params);
    },[params])

    //列表操作，系统不可编辑，自定义的可以编辑
    const actionView = (record) => {
        return(
            <>
                {
                    record.type==="custom"
                        ?<Space size="middle">
                            <ApiStatusEdit name="编辑" apiStatusId={record.id}/>
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={() => deleteApiStatus(record.id)}
                                okText='确定'
                                cancelText='取消'
                            >
                                <a style={{color: 'red'}}>删除</a>
                            </Popconfirm>
                        </Space>
                        :
                        <Space size="middle">
                            <Tooltip title="系统状态不可编辑">
                                <span style={{color: '#d4d4d4'}}>编辑</span>
                            </Tooltip>
                            <Tooltip title="系统状态不可删除">
                                <span style={{color: '#d4d4d4'}}>删除</span>
                            </Tooltip>
                        </Space>
                }
            </>
        )
    }

    //搜索
    const onSearch = (e) =>{
        setCurrentPage(1)
        let newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            },
        }
        if (e.target.value) {
            newParams = {
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                },
                name:e.target.value,
            }
        }
        setParams(newParams)
    }

    // 分页
    const onTableChange = (pagination) => {
        setCurrentPage(pagination.current)
        const newParams = {
            ...params,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            },
        }
        setParams(newParams)
    }


    return(
        <Row justify={'center'} style={{width:'100%'}}>
            <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
            <Breadcrumb separator=">"  className={"apibox-breadcrumb"} >
                <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                <Breadcrumb.Item>状态管理</Breadcrumb.Item>
            </Breadcrumb>
            <div className='wslist-searchbtn'>
                <Input
                    placeholder="搜索名称"
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <ApiStatusEdit name="添加状态" />
            </div>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={apiStatusList}
                rowKey={record=>record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
            />

            </Col>
        </Row>
    )
}

export default inject('apxMethodStatusStore')(observer(ApiStatus));
