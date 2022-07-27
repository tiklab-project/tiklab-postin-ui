/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import { Input, Table, Space, Button, Popconfirm} from 'antd';
import WorkspaceEdit from './workspaceEdit';
import { RemoteUmdComponent } from 'doublekit-plugin-ui'
import {useSelector} from "doublekit-plugin-ui/es/_utils"
import  { useTranslation } from 'react-i18next'
import {getUser} from "doublekit-core-ui";
import BreadcrumbEx from "../../common/breadcrumbEx";
import {toWorkspaceDetail} from "../common/workspaceFn";

const WorkspaceCreate = (props) => {
    const { workspaceStore,workspaceRecentStore } = props;

    const {
        findWorkspacePage,
        deleteWorkspace,
        workspaceList,
        totalRecord,
    } = workspaceStore;

    const {workspaceRecent}=workspaceRecentStore;

    const pluginStore = useSelector(store => store.pluginStore)

    const { t } = useTranslation();

    //空间列表头
    const columns = [
        {
            title:` ${t('wsName')}`,
            dataIndex: "workspaceName",
            key: "workspaceName",
            width:"30%",
            // align:"center",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage(record.id)}>{text}</a>
            )
        },
        {
            title:` ${t('wsId')}`,
            dataIndex: "id",
            key: "id",
            width:"20%",
            // align:"center",
        },
        {
            title: ` ${t('desc')}`,
            dataIndex: "desc",
            key: "desc",
            width:"30%",
            // align:"center",
        },
        {
            title: ` ${t('operation')}`,
            key: "action",
            // align:"center",
            width:"20%",
            render: (text, record) => (
                <Space size="middle">
                    <WorkspaceEdit name={`${t('edit')}`} type='edit' workspaceId={record.id} />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteWorkspace(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('delete')}</a>
                    </Popconfirm>

                    <RemoteUmdComponent point='export' pluginStore={pluginStore}/>
                </Space>
            ),
        },
    ]

     const userId = getUser().userId;
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



    // 保存空间id到缓存
    const setLocalStorage = (workspaceId) => {

        toWorkspaceDetail(workspaceId,userId,workspaceRecent)

        props.history.push('/workspace');
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
            <BreadcrumbEx
                list={[
                    t('wsMgr'),
                    t('wsList')
                ]}
            />
            <div className='wslist-searchbtn'>
                <div className='wslist-eibtn'>
                    <WorkspaceEdit
                        className="important-btn"
                        name={`${t('addws')}`}
                        type="add"
                        style={{ width: 200 }}
                        userId={userId}
                    />
                    <RemoteUmdComponent point='import' pluginStore={pluginStore}/>

                </div>
                <Input
                    placeholder={`${t('searchWorkspace')}`}
                    onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
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

export default inject('workspaceStore',"workspaceFollowStore","workspaceRecentStore")(observer(WorkspaceCreate));
