import React, {useEffect,useState} from 'react';
import { observer, inject } from "mobx-react";
import { Input, Popconfirm, Space, Table} from 'antd';
import '../../../category/components/category.scss';
import ApxMethodEdit from '../../http/components/apxMethodEdit';
import RequestType from "../../../common/requestType";

// 点击左侧导航栏目录，查看的所在目录中的接口
const ApixList = (props) => {
    const {categoryStore, apixStore} = props;
    const {findCategoryList} = categoryStore;
    const {findApixPage, apixList, totalRecord, deleteApix} = apixStore;

    //接口列表头
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            width: '25%',
            render: (text,record) => (
                <a onClick = {()=>setLocalStorage('apxMethodId',record.id)}>{text}</a>
            )
        },
        {
            title: '类型',
            dataIndex: 'requestType',
            width: '8%',
            render:(text,record)=>(<RequestType type={text}/>)
        },
        {
            title: '地址',
            dataIndex: 'path',
            width: '25%',
        },
        {
            title: '状态',
            dataIndex: ['status','name'],
            width: '10%',
            render:(text) =>(
                <span>{text}</span>
            )
        },
        {
            title: '执行人',
            dataIndex: ['executor','name'],
            width: '15%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) =>(
                <Space>
                    <ApxMethodEdit
                        name="编辑"
                        apixId={record.id}
                        type={'edit'}
                        pagination={params}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deletMethod(record)}
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
    const setLocalStorage = (apixId,id) => {
        localStorage.setItem(apixId,id)
        props.history.push('/workspacepage/apis/detail/interface')
    }

    useEffect(()=>{
        const values = {
            "categoryId":categoryId,
            ...params
        }

        findApixPage(values);
    },[categoryId,params])

    //删除
    const deletMethod = (record) =>{
        deleteApix(record).then(()=> {
            findApixPage(categoryId);
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
                <Input
                    placeholder={'搜索接口'}
                    onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
                <ApxMethodEdit
                    name="添加接口"
                    type="add"
                    isBtn={'btn'}
                    pagination={params}
                />
            </div>
            <Table
                dataSource={apixList}
                columns={columns}
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

export default inject('apixStore','categoryStore')(observer(ApixList));

