/**
 * @description：数据结构页
 * @date: 2021-07-29 09:54
 */
import React, {useEffect,useState} from 'react'
import {Breadcrumb, Col, Input, Popconfirm, Row, Space, Table} from "antd";
import DataStructureEdit from "./dataStructureEdit";
import {inject, observer} from "mobx-react";
import SetData from "./setData";
import BreadcrumbEx from "../../../common/breadcrumbEx";

const DataStructure = (props) => {
    const {dataStructureStore} = props;
    const {findDataStructurePage,deleteDataStructure,dataStructureList,totalRecord} = dataStructureStore;

    const columns = [
        {
            title:` 编码`,
            dataIndex: "coding",
            key: "code",
            align:"center",
        },
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            align:"center",
        },
        {
            title: `类型`,
            dataIndex: "dataType",
            key: "dataType",
            align:"center",
        },
        {
            title: `创建人`,
            dataIndex: "createUser",
            key: "uesr",
            align:"center",
        },
        {
            title: `创建时间`,
            dataIndex: "createTime",
            key: "time",
            align:"center",
        },
        {
            title: `操作`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <DataStructureEdit name={'编辑'} dataStructureId={record.id}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteDataStructure(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>删除</a>
                    </Popconfirm>
                    <SetData dataType={record.dataType} dataStructureId={record.id}/>
                </Space>
            ),
        },
    ]

    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    useEffect(()=>{
        findDataStructurePage(params)
    },[params])

    //分页
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

    //搜索
    const onSearch = (e) => {
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



    return(
        <div style={{padding:5}}>
            <BreadcrumbEx list={[ "空间设置", "数据结构"]}/>
            <div className='wslist-searchbtn'>
                <Input
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <DataStructureEdit name={'添加数据结构'}  />
            </div>

            <Table
                columns={columns}
                dataSource={dataStructureList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
            />
        </div>

    )
}

export default inject('dataStructureStore')(observer(DataStructure));
