import React, {useEffect,useState} from 'react';
import { observer } from "mobx-react";
import { Input, Popconfirm, Space, Table} from 'antd';
import '../../../../category/components/category.scss';
import ApxMethodEdit from './ApxMethodEdit';
import MethodType from "../../../../common/MethodType";
import {SearchOutlined} from "@ant-design/icons";
import CategoryDocDrawer from "../../../../category/components/CategoryDocDrawer";
import {getUser} from "tiklab-core-ui";
import categoryStore from "../../../../category/store/CategoryStore";
import apxMethodStore from "../store/ApxMethodStore";

/**
 * 点击左侧导航栏目录，查看的所在目录中的接口列表
 */
const HttpList = (props) => {
    const {findCategoryList,apiRecent} = categoryStore;
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
            render:(text,record) =>(
                <span style={{color:`${record.apix.status.color}`}}>{text}</span>
            )
        },
        {
            title: '执行人',
            dataIndex: ['apix','executor','nickname'],
            width: '15%',
            render:(text) =>(
                <span >{text||"未设置"}</span>
            )
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

    //获取id
    const categoryId =  localStorage.getItem('categoryId');
    const workspaceId = localStorage.getItem('workspaceId');

    /**
     * 保存接口id，并跳往接口页面
     */
    const setLocalStorage = async (record) => {
        //设置最近打开的接口
        let params = {
            workspace:{id:workspaceId},
            user:{id:getUser().userId},
            apix:{id:record.id},
        }
        await apiRecent(params)

        localStorage.setItem("apxMethodId",record.id)
        props.history.push('/workspace/apis/content/document')
    }

    useEffect(async ()=>{
        await findApxMethodListByApix({categoryId:categoryId});
    },[categoryId])

    /**
     * 删除接口
     */
    const deleteMethod = (id) =>{
        deleteApxMethod(id).then(async ()=> {
            await findApxMethodListByApix({categoryId:categoryId});
            await findCategoryList(workspaceId);
        })
    }

    /**
     * 搜索接口
     */
    const onSearch = async (e) => {
        await findApxMethodListByApix({
            name:e.target.value,
            categoryId:categoryId
        });
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
                        <CategoryDocDrawer categoryId={categoryId}/>
                        <ApxMethodEdit
                            name="+添加接口"
                            type="add"
                            isBtn={'btn'}
                            {...props}
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

export default observer(HttpList);

