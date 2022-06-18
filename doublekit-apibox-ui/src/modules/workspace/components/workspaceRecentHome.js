import React, {useEffect} from "react";
import {Table} from "antd";
import {getUser} from "doublekit-core-ui";
import {inject, observer} from "mobx-react";
import {toWorkspaceDetail} from "../common/workspaceFn";

const WorkspaceRecentHome = (props) =>{
    const {workspaceRecentStore} = props;

    const {findWorkspaceRecentList,recentList,workspaceRecent}=workspaceRecentStore;

    const userId = getUser().userId;

    const columns = [
        {
            title:"空间名",
            dataIndex:["workspace","workspaceName"],
            key: 'name',
            width:"30%",
            render: (text,record) =>(
                <a onClick = {()=>toDetail(record.workspace.id)}>{text}</a>
            )
        },
        {
            title: '访问时间',
            dataIndex: 'updateTime',
            key: 'time',
        },
    ]

    useEffect(()=>{
        findWorkspaceRecentList(userId)
    },[userId])

    // 去往详情页
    const toDetail = (workspaceId) => {
        toWorkspaceDetail(workspaceId,userId,workspaceRecent)
        props.history.push('/workspace');
    }


    return(
        <>
            <Table
                columns={columns}
                dataSource={recentList}
                pagination={false}
                rowKey={(record => record.id)}
            />

        </>
    )
}

export default inject("workspaceRecentStore")(observer(WorkspaceRecentHome));