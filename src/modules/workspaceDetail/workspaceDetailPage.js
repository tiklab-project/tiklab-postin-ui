/*
 * @Description: 空间详情
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:25:07
 */

import React, {Fragment, useEffect, useState} from "react";
import { observer, inject } from "mobx-react";
import {Breadcrumb, Button, List} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },

];

const WorkspaceDetail = (props) => {
    const { workspaceStore } = props;

    const {
        workspaceName,
        findWorkspace
    } = workspaceStore;

    const workspaceId = localStorage.getItem("workspaceId")
    useEffect(()=> {
        findWorkspace(workspaceId)
    },[workspaceId])





    return (
        <div className={"ws-detail-page"}>
            <Breadcrumb separator=">"  className={"apibox-breadcrumb"}>
                <Breadcrumb.Item>空间</Breadcrumb.Item>
                <Breadcrumb.Item>概况</Breadcrumb.Item>
            </Breadcrumb>
            <hr/>
            <div className="det-box">
                <div className="det-item">
                    <div className="det-icon">
                        <UserOutlined style={{fontSize: "22px"}}/>
                    </div>
                    <div>
                        <p>USER-SERVICE</p>
                        <p>{workspaceName}</p>
                    </div>
                </div>
                <div className="det-item">
                    <div className="det-icon">
                        <UserOutlined style={{fontSize: "22px"}}/>
                    </div>
                    <div>
                        <p>USER-SERVICE</p>
                        <p>{workspaceName}</p>
                    </div>
                </div>
                <div className="det-item">
                    <div className="det-icon">
                        <UserOutlined style={{fontSize: "22px"}}/>
                    </div>
                    <div>
                        <p>USER-SERVICE</p>
                        <p>{workspaceName}</p>
                    </div>
                </div>
                <div className="det-item">
                    <div className="det-icon">
                        <UserOutlined style={{fontSize: "22px"}}/>
                    </div>
                    <div>
                        <p>USER-SERVICE</p>
                        <p>{workspaceName}</p>
                    </div>
                </div>

            </div>
            {/*<Button onClick={clickSocket}>websocket</Button>*/}
            <div className="det-state">
                <p>仓库动态</p>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            title={item.title}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    )

}
export default inject('workspaceStore')(observer(WorkspaceDetail));
