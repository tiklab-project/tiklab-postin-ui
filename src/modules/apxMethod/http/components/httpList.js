import React, {useEffect,useState} from 'react';
import { observer, inject } from "mobx-react";
import { Input, Popconfirm, Space, Table} from 'antd';
import '../../../category/components/category.scss';
import ApxMethodEdit from './apxMethodEdit';
import MethodType from "../../../common/methodType";
import {SearchOutlined} from "@ant-design/icons";
import CategoryDocDrawer from "../../../category/components/categoryDocDrawer";

// 点击左侧导航栏目录，查看的所在目录中的接口
const HttpList = (props) => {
    const {categoryStore, apxMethodStore} = props;
    const {findCategoryList} = categoryStore;
    const {findApxMethodListByApix,apxMethodList,deleteApxMethod} = apxMethodStore;

    //接口列表头
    const columns = [
        {
            title: '名称',
            dataIndex: ["apix",'name'],
            width: '25%',
            render: (text,record) => (
                <Space size={"middle"}>
                    <MethodType type={record.methodType}/>
                    <a onClick = {()=>setLocalStorage(record)}>{text}</a>
                </Space>

            )
        },
        {
            title: '地址',
            dataIndex: 'path',
            width: '35%',
        },
        {
            title: '状态',
            dataIndex: ['apix','status','name'],
            width: '15%',
            render:(text) =>(
                <span>{text}</span>
            )
        },
        {
            title: '执行人',
            dataIndex: ['apix','executor','name'],
            width: '15%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            render: (text, record) =>(
                <Space  size="middle">
                    <ApxMethodEdit
                        name="编辑"
                        httpId={record.id}
                        type={'edit'}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteMethod(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <svg className="icon-s edit-icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-shanchu3`} />
                        </svg>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    //获取id
    const categoryId =  localStorage.getItem('categoryId');
    const workspaceId = localStorage.getItem('workspaceId');

    //保存接口id，并跳往接口页面
    const setLocalStorage = (record) => {
        localStorage.setItem("apxMethodId",record.id)

        props.history.push('/workspace/apis/document')
    }

    useEffect(()=>{
        findApxMethodListByApix(categoryId);
    },[categoryId,params])

    //删除
    const deleteMethod = (id) =>{
        deleteApxMethod(id).then(()=> {
            findApxMethodListByApix(categoryId);
            findCategoryList(workspaceId);
        })
    }

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
        <div className={"content-margin"}>
            <div className='content-margin-box list-content-center'>
                <div className={'category-search'}>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder={'搜索接口'}
                        onPressEnter={onSearch}
                        className='search-input'
                        style={{width:240}}
                    />
                    <Space>
                        <CategoryDocDrawer
                            categoryId={categoryId}
                        />
                        <ApxMethodEdit
                            name="+添加接口"
                            type="add"
                            isBtn={'btn'}
                            {...props}
                            // pagination={params}
                        />
                    </Space>

                </div>
                <div className={"pi-list-box"}>
                    <Table
                        dataSource={apxMethodList}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                </div>

            </div>

        </div>
    )
}

export default inject('apxMethodStore','categoryStore')(observer(HttpList));

