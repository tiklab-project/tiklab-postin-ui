/**
 * @description：
 * @date: 2021-07-22 13:08
 */

import React, {useEffect,useState} from 'react';
import {Breadcrumb, Button, Space, Table} from "antd";
import apxMethodStore from "./methodStore";
import {observer} from 'mobx-react';

const Index = (props) => {
    const {findVersionPage,deleteVersion,versionList,totalRecord} =apxMethodStore;
    //版本管理表头
    const columns = [
        {
            title: '',
            dataIndex: 'setCurrent',
            key: 'setCurrent',
            align:'center',
            width:'6%',
            render:(text,record) => (
                record.versionCode === 'current'
                    ? <div className={'cur-table-icon'}>当前</div>
                    :''
            )
        },
        {
            title: '版本号',
            dataIndex: 'versionCode',
            key: 'versionCode',
        },
        {
            title: '创建人',
            dataIndex: 'createUser',
            key: 'createUser',
        },
        {
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => (
                record.versionCode === 'current'
                    ? <a onClick={()=>toDetail(record.id)}>详情</a>
                    :<Space size="middle">
                        <a onClick={()=>toComparePage(record.id)}>对比</a>
                        <a onClick={()=>toDetail(record.id)}>详情</a>
                        <a onClick={()=>setLocalStorage(record.id)}>切换 </a>
                        <a className="table-delete" onClick={()=>deleteVersion(record.id)}>删除</a>
                    </Space>
            ),
        }
    ];

    //设置分页参数
    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    const methodId = localStorage.getItem('apxMethodId');
    const onVersionId=methodId;


    useEffect(()=>{
        findVersionPage(onVersionId,params)
    },[params])

    const addRouter = props.history.push;

    //从版本管理返回到接口
    const goBack = () => {
        addRouter('/workspacepage/interface')
    }

    //对比，跳往对比页
    const toComparePage = (id) => {
        localStorage.setItem('oldMethodId',id)
        addRouter('/pluginfull/compare')
    }

    //详情，跳往详情页
    const toDetail = (id) => {
        localStorage.setItem('detailMethod',id)
        addRouter({pathname:'/workspacepage/versiondetail'})
    }

    //切换，
    const setLocalStorage = (id) => {
        return
        // localStorage.setItem('apxMethodId',id)
        // addRouter('/workspacedetail/interface')
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
        <>
            <div className='breadcrumb-contant'>
                <div className='breadcrumb'>
                    <Breadcrumb separator=">" >
                        <Breadcrumb.Item onClick={goBack} className='bread-cursor'>接口定义</Breadcrumb.Item>
                        <Breadcrumb.Item>版本管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div >
                    <Button className="important-btn" onClick={goBack}>返回</Button>
                </div>
            </div>
            <Table
                dataSource={versionList}
                columns={columns}
                rowKey = {record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
            />
        </>
    )
}

export default observer(Index);
