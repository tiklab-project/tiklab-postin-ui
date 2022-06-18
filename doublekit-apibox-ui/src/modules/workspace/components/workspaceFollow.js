import React, {useEffect} from "react";
import {Table} from "antd";
import {getUser} from "doublekit-core-ui";
import {inject, observer} from "mobx-react";
import {toWorkspaceDetail} from "../common/workspaceFn";
import BreadcrumbEx from "../../common/breadcrumbEx";
import {useTranslation} from "react-i18next";

const WorkspaceFollow = (props) =>{
    const {workspaceFollowStore} = props;

    const {findWorkspaceFollowList,followList,workspaceFollow}=workspaceFollowStore;
    const userId = getUser().userId;
    const { t } = useTranslation();

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
        findWorkspaceFollowList(userId)
    },[userId])

    // 去往详情页
    const toDetail = (workspaceId) => {
        toWorkspaceDetail(workspaceId,userId,workspaceFollow)
        props.history.push('/workspace');
    }


    return(
        <>
            <BreadcrumbEx
                list={[
                    t('wsMgr'),
                    t('wsList')
                ]}
            />
            <Table
                columns={columns}
                dataSource={followList}
                pagination={false}
                rowKey={(record => record.id)}
            />

        </>
    )
}

export default inject("workspaceFollowStore")(observer(WorkspaceFollow));