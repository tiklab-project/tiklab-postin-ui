import React, {useEffect,useState} from 'react';
import { observer, inject } from "mobx-react";
import { Input, Popconfirm, Space, Table} from 'antd';
import '../../../category/components/category.scss';
import ApxMethodEdit from './apxMethodEdit';
import MethodType from "../../../common/methodType";

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
                <a onClick = {()=>setLocalStorage(record)}>{text}</a>
            )
        },
        {
            title: '类型',
            dataIndex: 'requestType',
            width: '8%',
            render:(text,record)=>(<MethodType type={text}/>)
        },
        {
            title: '地址',
            dataIndex: 'path',
            width: '20%',
        },
        {
            title: '时间',
            dataIndex: ['apix','createTime'],
            width: '10%',
        },
        {
            title: '状态',
            dataIndex: ['apix','status','name'],
            width: '10%',
            render:(text) =>(
                <span>{text}</span>
            )
        },
        {
            title: '执行人',
            dataIndex: ['apix','executor','name'],
            width: '10%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) =>(
                <Space>
                    <ApxMethodEdit
                        name="编辑"
                        httpId={record.id}
                        type={'edit'}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deletMethod(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>删除</a>
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
        props.history.push('/workspace/apis/detail/interface')
    }

    useEffect(()=>{
        findApxMethodListByApix(categoryId);
    },[categoryId,params])

    //删除
    const deletMethod = (id) =>{
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

    return(
        <div className='main-contant'>
            <div className={'category-search'}>
                <ApxMethodEdit
                    name="添加接口"
                    type="add"
                    isBtn={'btn'}
                    {...props}
                    // pagination={params}
                />
                <Input
                    placeholder={'搜索接口'}
                    onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
            </div>
            <Table
                dataSource={apxMethodList}
                columns={columns}
                rowKey={record => record.id}
                pagination={false}
                // pagination={{
                //     current:currentPage,
                //     pageSize:pageSize,
                //     total:totalRecord,
                // }}
                // onChange = {(pagination) => onTableChange(pagination)}
            />
        </div>
    )
}

export default inject('apxMethodStore','categoryStore')(observer(HttpList));
