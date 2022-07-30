/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import { Table,} from 'antd';
import  { useTranslation } from 'react-i18next'
import {getUser} from "tiklab-core-ui"
import BreadcrumbEx from "../../common/breadcrumbEx";
import {toWorkspaceDetail} from "../common/workspaceFn";

const WorkspaceList = (props) => {
    const { workspaceStore, workspaceRecentStore } = props;
    const {
        findAllWorkspace,
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

    ]

    const userId = getUser().userId;


    const [workspaceList, setWorkspaceList] = useState();

    useEffect(()=> {
        findList()
    },[])

    const findList = (data)=>{
        findAllWorkspace(data).then(res=>{
            setWorkspaceList(res)
        })
    }

    // 去往详情页
    const toDetail = (workspaceId) => {
        toWorkspaceDetail(workspaceId,userId,workspaceRecent)
        props.history.push('/workspace');
    }


    return(
        <>
            <BreadcrumbEx list={[ t('wsMgr'), t('wsList')]}/>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={workspaceList}
                rowKey={record => record.id}
                pagination={false}
            />
        </>
    )
}

export default inject('workspaceStore',"workspaceRecentStore")(observer(WorkspaceList));
