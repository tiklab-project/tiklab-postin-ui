/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import { Input, Table, Space, Button, Popconfirm} from 'antd';
import WorkspaceEdit from './workspaceEdit';
import { PluginComponent,PluginFun, PLUGIN_STORE} from 'doublekit-plugin-ui'
import  { useTranslation } from 'react-i18next'
import {getUser} from "doublekit-core-ui"
import BreadcrumbEx from "../../common/breadcrumbEx";
import {globalTabListInit} from "../../common/globalSharing";
import {workspaceRecent} from "../api/workspaceRecentApi";
import {toWorkspaceDetail} from "../common/workspaceFn";

const WorkspaceList = (props) => {
    const { workspaceStore, pluginsStore,workspaceRecentStore } = props;
    const {
        findAllWorkspace,
        deleteWorkspace,
        totalRecord,
        length
    } = workspaceStore;

    const {workspaceRecent}=workspaceRecentStore;

    const { t } = useTranslation();

    //空间列表头
    const columns = [
        {
            title:` ${t('wsName')}`,
            dataIndex: "workspaceName",
            key: "workspaceName",
            // align:"center",
            width:"30%",
            render: (text,record) =>(
                <a onClick = {()=>toDetail(record.id)}>{text}</a>
            )
        },
        {
            title: `创建人`,
            dataIndex: ["user","name"],
            key: "userName",
            // align:"center",
            width:"20%",
        },
        {
            title: ` ${t('desc')}`,
            dataIndex: "desc",
            key: "desc",
            // align:"center",
            width:"50%",
        },

        // {
        //     title: ` ${t('operation')}`,
        //     key: "action",
        //     align:"center",
        //     width:"20%",
        //     render: (text, record) => (
        //     <Space size="middle">
        //         <div>
        //             <WorkspaceEdit
        //                 name={`${t('edit')}`}
        //                 type='edit'
        //                 workspaceId={record.id}
        //                 userId={userId}
        //             />
        //         </div>
        //         <Popconfirm
        //             title="确定删除？"
        //             onConfirm={() =>deleteWorkspace(record.id)}
        //             okText='确定'
        //             cancelText='取消'
        //         >
        //             <a href="#" style={{color:'red'}}>{t('delete')}</a>
        //         </Popconfirm>
        //         <PluginComponent point='export' pluginsStore={pluginsStore}/>
        //     </Space>
        //     ),
        // },
    ]

    const userId = getUser().userId;
    const [ pluginLength, setPluginLength ] = useState()
    // const [pageSize] = useState(5);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [params, setParams] = useState({
    //     pageParam: {
    //         pageSize: pageSize,
    //         currentPage: currentPage
    //     }
    // })

    const [workspaceList, setWorkspaceList] = useState();

    useEffect(()=> {
        findList()
    },[])

    useEffect(()=>{
        const pluginComConfig = new PluginFun(props, "import", {});
        const plug = pluginComConfig.getPlugins();
        setPluginLength(plug.length)
    },[])

    const findList = (data)=>{
        findAllWorkspace(data).then(res=>{
            setWorkspaceList(res)
        })
    }

    // 去往详情页
    const toDetail = (workspaceId) => {
        //点击api按钮时初始化api中tab页信息
        const apiTabInfo = {
            activeKey:0,
            tabList:[
                {
                    name:"初始页",
                    id:workspaceId,
                    type:"list",
                }
            ]
        }
        sessionStorage.setItem("apiTabListInfo",JSON.stringify(apiTabInfo))

        toWorkspaceDetail(workspaceId,userId,workspaceRecent)
        props.history.push('/workspace');
    }

    //搜索
    const onSearch = (e) =>{

        findList({workspaceName:e.target.value})
        // setCurrentPage(1)
        // let newParams = {
        //     pageParam: {
        //         pageSize: pageSize,
        //         currentPage: 1
        //     },
        // }
        // if (e.target.value) {
        //     newParams = {
        //         pageParam: {
        //             pageSize: pageSize,
        //             currentPage: 1
        //         },
        //         workspaceName:e.target.value,
        //     }
        // }
        // setParams(newParams)
    }


    return(
        <>
            <BreadcrumbEx list={[ t('wsMgr'), t('wsList')]}/>
            {/*<div className='wslist-searchbtn'>*/}
            {/*    <div className='wslist-eibtn'>*/}
            {/*        <WorkspaceEdit*/}
            {/*            className="important-btn"*/}
            {/*            name={`${t('addws')}`}*/}
            {/*            type="add"*/}
            {/*            style={{ width: 200 }}*/}
            {/*            userId={userId}*/}
            {/*        />*/}
            {/*        {*/}
            {/*            pluginLength && pluginLength>0 ? <PluginComponent point='import' pluginsStore={pluginsStore}/> : <Button disabled>导入</Button>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*    <Input*/}
            {/*        placeholder={`${t('searchWorkspace')}`}*/}
            {/*        onPressEnter={onSearch}*/}
            {/*        className='search-input'*/}
            {/*        style={{width:240}}*/}
            {/*    />*/}
            {/*</div>*/}

            <Table
                className="tablelist"
                columns={columns}
                dataSource={workspaceList}
                rowKey={record => record.id}
                pagination={false}
                // pagination={{
                //     current:currentPage,
                //     pageSize:pageSize,
                //     total:totalRecord,
                // }}
                // onChange = {(pagination) => onTableChange(pagination)}
            />
        </>
    )
}

export default inject('workspaceStore', PLUGIN_STORE,"workspaceRecentStore")(observer(WorkspaceList));
