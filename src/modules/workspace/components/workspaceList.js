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
import {Profile} from "tiklab-eam-ui";

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
            width:"50%",
            // align:"center",
            render: (text,record) =>(
                <Space>
                    <img src={record.iconUrl} alt={"icon"} className={"workspace-icon"}/>
                    <a onClick = {()=>setLocalStorage(record.id)}>{text}</a>
                </Space>
            )
        },
        {
            title: `负责人`,
            dataIndex: ["user","name"],
            key: "user",
            width:"20%",
            render: (text, record) => (
                <div className={"ws-user-item"}>
                    <Space>
                        <Profile userInfo={record.user}/>
                        <span>{record.user.nickname} </span>
                    </Space>
                </div>

            )
        },{
            title: `可见范围`,
            dataIndex: "visibility",
            key: "visibility",
            width:"20%",
            render: (text, record) => (
                <>
                    {
                        text===0
                            ? showVisibility("公共","suoding")
                            :showVisibility("私密","jiesuo")
                    }
                </>

            )
        },
        {
            title: ` ${t('operation')}`,
            key: "action",
            width:"10%",
            // align:"center",
            render: (text, record) => (
                <div style={{display:"flex","justifyContent":"space-between",width:60}}>
                    <Tooltip title="空间成员">
                        <svg style={{width:16,height:16,"cursor":"pointer"}} aria-hidden="true" onClick={()=>toWorkspaceUser(record.id)}>
                            <use xlinkHref= {`#icon-chengyuan`} />
                        </svg>

                    </Tooltip>
                    <svg style={{width:16,height:16,"cursor":"pointer"}} aria-hidden="true" onClick={()=>follow(record)}>
                        <use xlinkHref= {`#icon-${  record.isFollow===0 ? "shoucang":"shoucang1" }`}  />
                    </svg>
                </div>
            ),
        },
    ]

    //可见范围的展示
    const showVisibility = (name,icon) =>{
        return <div style={{"display":"flex","alignItems":"center","gap":"6px"}}>
            <svg style={{width:16,height:16}} aria-hidden="true">
                <use xlinkHref= {`#icon-${icon}`} />
            </svg>
            <span>{name}</span>
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
                user: {id:userId},
                workspace: {id:record.id}
            }
            createWorkspaceFollow(param).then(()=>{
                findList({},selectItem)
            })
        }

    }


    return(
        <div className={"pi-list-box"}>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={workspaceList}
                rowKey={record => record.id}
                pagination={false}
                // showHeader={false}
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
