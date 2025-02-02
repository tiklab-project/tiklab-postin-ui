
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Table, Space, Empty, Tooltip} from 'antd';
import {getUser} from "tiklab-core-ui";
import {ShowWorkspaceIcon, toWorkspaceDetail} from "./WorkspaceFn";
import Avatar from "../../../common/avatar/avatar";
import workspaceFollowStore from "../store/WorkspaceFollowStore";
import workspaceRecentStore from "../store/WorkspaceRecentStore";

/**
 * 空间页
 */
const WorkspaceList = (props) => {
    const {workspaceStore, findList,selectItem,workspaceList,loading} = props;
    const {settingMenuSelected} = workspaceStore;
    const {workspaceRecent}=workspaceRecentStore;
    const {createWorkspaceFollow,deleteWorkspaceFollow} = workspaceFollowStore;

    const userId = getUser().userId;


    //空间列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: "workspaceName",
            key: "workspaceName",
            width:"50%",
            render: (text,record) =>(
                <Space>
                    <ShowWorkspaceIcon url={record.iconUrl} className={"workspace-icon icon-bg-border"}/>
                    <span className={"link-text"} onClick = {()=>setLocalStorage(record.id)}>{text}</span>
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
                        <Avatar isBig={true} name={record.user?.nickname}/>
                        <span>{record?.user?.nickname} </span>
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
            title: ` 操作`,
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

    /**
     * 可见范围的展示
     */
    const showVisibility = (name,icon) =>{
        return <div style={{"display":"flex","alignItems":"center","gap":"6px"}}>
            <svg style={{width:16,height:16}} aria-hidden="true">
                <use xlinkHref= {`#icon-${icon}`} />
            </svg>
            <span>{name}</span>
        </div>
    }


    const toWorkspaceUser = (workspaceId)=>{
        toWorkspaceDetail(workspaceId,workspaceRecent,"setting");

        settingMenuSelected("/workspace/setting/member");
        props.history.push('/workspace/setting/member');
    }

    /**
     *  保存空间id到缓存
     */
    const setLocalStorage = (workspaceId) => {
        toWorkspaceDetail(workspaceId,workspaceRecent,"/workspace/quickTest")

        props.history.push('/workspace/quickTest');
    }


    /**
     * 收藏空间
     */
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
                columns={columns}
                dataSource={workspaceList}
                rowKey={record => record.id}
                pagination={false}
                loading={loading}
                locale={{
                    emptyText: !loading
                        ?<Empty
                            imageStyle={{height: 100}}
                            description={<span>暂无空间</span>}
                        />
                        :<div style={{height: 100}}/>,
                }}
            />
        </div>
    )
}

export default inject('workspaceStore')(observer(WorkspaceList));
