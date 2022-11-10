import React, {useEffect} from "react";
import {Space, Table} from "antd";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import {toWorkspaceDetail} from "./workspaceFn";

const WorkspaceRecentHome = (props) =>{
    const {workspaceRecentStore} = props;

    const {findWorkspaceRecentList,recentList,workspaceRecent}=workspaceRecentStore;

    const userId = getUser().userId;

    const columns = [
        {
            title:"空间名称",
            dataIndex:["workspace","workspaceName"],
            key: 'name',
            width:"70%",
            render: (text,record) =>(
                <Space size={"large"}>
                    {showIcon(text)}
                    <a onClick = {()=>toDetail(record.workspace.id)}>{text}</a>
                </Space>
            )
        },
        {
            title: '访问时间',
            dataIndex: 'updateTime',
            key: 'time',
        },
    ]

    useEffect(()=>{
        findWorkspaceRecentList({userId:userId})
    },[userId])

    // 去往详情页
    const toDetail = (workspaceId) => {
        toWorkspaceDetail(workspaceId,userId,workspaceRecent)
        props.history.push('/workspace');
    }

    const showIcon = (text)=>{
        let t = text.substring(0,1).toUpperCase();

        return <div className={"workspace-text-icon-box"}>
            <span>{t}</span>
        </div>
    }



    return(
        <div className={"list-box-cell"}>
            <Table
                columns={columns}
                dataSource={recentList}
                pagination={false}
                rowKey={(record => record.id)}
                showHeader={false}
            />

        </div>
    )
}

export default inject("workspaceRecentStore")(observer(WorkspaceRecentHome));