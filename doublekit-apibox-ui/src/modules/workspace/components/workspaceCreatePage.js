/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Button, Popconfirm} from 'antd';
import WorkspaceEdit from './workspaceEdit';
import { PluginComponent,PluginFun, PLUGIN_STORE} from 'doublekit-plugin-manage'
import  { useTranslation } from 'react-i18next'
import {getUser} from "doublekit-core-ui";

const WorkspaceCreatePage = (props) => {
    const { workspaceStore,pluginsStore } = props;

    const {
        findWorkspacePage,
        deleteWorkspace,
        workspaceList,
        totalRecord,
    } = workspaceStore;

    const { t } = useTranslation();

    //空间列表头
    const columns = [
        {
            title:` ${t('wsName')}`,
            dataIndex: "workspaceName",
            key: "workspaceName",
            align:"center",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage('workspaceId',record.id)}>{text}</a>
            )
        },
        {
            title:` ${t('wsId')}`,
            dataIndex: "id",
            key: "id",
            align:"center",
        },
        {
            title: ` ${t('desc')}`,
            dataIndex: "desc",
            key: "desc",
            align:"center",
        },
        {
            title: ` ${t('operation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <div>
                        <WorkspaceEdit name={`${t('edit')}`} type='edit' workspaceId={record.id} />
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteWorkspace(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('delete')}</a>
                    </Popconfirm>
                    <PluginComponent point='export' pluginsStore={pluginsStore}/>
                </Space>
            ),
        },
    ]

     const userId = getUser().userId;
    const [ pluginLength, setPluginLength ] = useState()
    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })


    useEffect(()=> {
        const param = {userId:userId,...params}
        findWorkspacePage(param)
    },[userId,params])

    useEffect(()=>{
        const pluginComConfig = new PluginFun({pluginsStore}, "import", {});
        const plug = pluginComConfig.getPlugins();
        setPluginLength(plug.length)
    },[])

    // 保存空间id到缓存
    const setLocalStorage = (workspaceId,id) => {
        localStorage.setItem(workspaceId,id);
        props.history.push('/workspacepage');
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
                workspaceName:e.target.value,
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
        <Fragment>
            <Breadcrumb separator=">"  className={"apibox-breadcrumb"}>
                <Breadcrumb.Item>{t('wsMgr')}</Breadcrumb.Item>
                <Breadcrumb.Item>{t('wsList')}</Breadcrumb.Item>
            </Breadcrumb>
            <div className='wslist-searchbtn'>
                <Input
                    placeholder={`${t('searchWorkspace')}`}
                    onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
                <div className='wslist-eibtn'>
                    <WorkspaceEdit
                        className="important-btn"
                        name={`${t('addws')}`}
                        type="add"
                        style={{ width: 200 }}
                        userId={userId}
                    />
                    {
                        pluginLength && pluginLength>0 ? <PluginComponent point='import' pluginsStore={pluginsStore}/> : <Button disabled>导入</Button>
                    }
                </div>
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={workspaceList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
            />
        </Fragment>
    )
}

export default inject('workspaceStore',PLUGIN_STORE,)(observer(WorkspaceCreatePage));
