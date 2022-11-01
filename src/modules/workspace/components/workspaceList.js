/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React from 'react';
import { observer, inject } from "mobx-react";
import {Table, Space, Empty, Tooltip} from 'antd';
import  { useTranslation } from 'react-i18next'
import {getUser} from "tiklab-core-ui";
import {toWorkspaceDetail} from "./workspaceFn";
import emptyImg  from "../../../assets/img/empty.png"

const WorkspaceList = (props) => {
    const { workspaceStore,workspaceRecentStore,workspaceFollowStore,findList,selectItem } = props;

    const { workspaceList,settingMenuSelected } = workspaceStore;

    const {workspaceRecent}=workspaceRecentStore;
    const {createWorkspaceFollow,deleteWorkspaceFollow} = workspaceFollowStore;

    const userId = getUser().userId;
    const { t } = useTranslation();

    //空间列表头
    const columns = [
        {
            title:` ${t('wsName')}`,
            dataIndex: "workspaceName",
            key: "workspaceName",
            width:"70%",
            // align:"center",
            render: (text,record) =>(
                <Space size={"large"}>
                    {showIcon(text)}
                    <a onClick = {()=>setLocalStorage(record.id)}>{text}</a>
                </Space>
            )
        },
        // {
        //     title: ` ${t('desc')}`,
        //     dataIndex: "desc",
        //     key: "desc",
        //     width:"30%",
        // },
        {
            title: ` ${t('operation')}`,
            key: "action",
            width:"20%",
            render: (text, record) => (
                <Space size="large">
                    <Tooltip title="空间成员">
                        <svg style={{width:20,height:20,"cursor":"pointer"}} aria-hidden="true" onClick={()=>toWorkspaceUser(record.id)}>
                            <use xlinkHref= {`#icon-chengyuan`} />
                        </svg>

                    </Tooltip>
                    <svg style={{width:20,height:20,"cursor":"pointer"}} aria-hidden="true" onClick={()=>follow(record)}>
                        <use xlinkHref= {`#icon-${  record.isFollow===0 ? "shoucang":"shoucang1" }`}  />
                    </svg>
                </Space>
            ),
        },
    ]

    const showIcon = (text)=>{
        let t = text.substring(0,1).toUpperCase();

        return <div className={"workspace-text-icon-box"}>
            <span>{t}</span>
        </div>
    }


    const toWorkspaceUser = (workspaceId)=>{
        toWorkspaceDetail(workspaceId,userId,workspaceRecent);

        settingMenuSelected("/workspace/setting/role");

        props.history.push('/workspace/setting/role');
    }

    // 保存空间id到缓存
    const setLocalStorage = (workspaceId) => {

        toWorkspaceDetail(workspaceId,userId,workspaceRecent)

        props.history.push('/workspace');
    }


    //收藏空间
    const follow = (record)=>{

        if(record.isFollow===1){
            deleteWorkspaceFollow(record.id).then(()=>{
                findList({},selectItem)
            })
        }else {
            let param = {
                userId:userId,
                workspace: {id:record.id}
            }
            createWorkspaceFollow(param).then(()=>{
                findList({},selectItem)
            })
        }


    }


    return(
        <div className={"list-box-cell"}>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={workspaceList}
                rowKey={record => record.id}
                pagination={false}
                showHeader={false}
                locale={{
                    emptyText: <Empty
                        imageStyle={{
                            height: 120,
                        }}
                        description={<span>暂无空间</span>}
                        image={emptyImg}
                    />,
                }}
            />
        </div>
    )
}

export default inject('workspaceStore',"workspaceFollowStore","workspaceRecentStore")(observer(WorkspaceList));
