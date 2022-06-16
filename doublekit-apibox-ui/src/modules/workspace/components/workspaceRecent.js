import React, {useEffect} from "react";
import {globalTabListInit} from "../../common/globalSharing";
import {Table} from "antd";
import {getUser} from "doublekit-core-ui";
import {inject, observer} from "mobx-react";

const WorkspaceRecent = (props) =>{
    const {workspaceRecentStore} = props;

    const {findWorkspaceRecentList,recentList,workspaceRecent}=workspaceRecentStore;
    const userId = getUser().id;

    const columns = [
        {
            title:"空间名",
            dataIndex:["workspace","workspaceName"],
            key: 'name',
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

    // 保存空间id到缓存
    const toDetail = (id) => {

        let params = {
            workspace: {id:id},
            userId:userId
        }
        workspaceRecent(params)

        globalTabListInit(id)

        localStorage.setItem("LEFT_MENU_SELECT","api");

        localStorage.setItem('workspaceId',id);

        props.history.push('/workspacepage');
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

export default inject("workspaceRecentStore")(observer(WorkspaceRecent));