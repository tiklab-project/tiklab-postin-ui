/*
 * @Description: workspace左侧导航栏
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 16:57:18
 */

import React, { Fragment, useState } from 'react';
import { renderRoutes } from "react-router-config";
import './workspace.scss';
import SideMenu from "../../common/sideMenu";


const Workspace = (props) => {
    const router = props.route.routes;

    //空间列表左侧导航列表
    const items = [
        {
            title: '我创建的空间',
            icon: 'icon-modular',
            key: `/workspacePage/create`
        },{
            title: '我参与的空间',
            icon: 'icon-modular',
            key: `/workspacePage/join`
        },{
            title: `最近浏览`,
            icon: 'icon-modular',
            key: `/workspacePage/recent`
        },{
            title: '我关注的空间',
            icon: 'icon-modular',
            key: `/workspacePage/follow`
        },{
            title: '所有空间',
            icon: 'icon-modular',
            key: `/workspacePage/all`
        }
    ];


    return(
        <Fragment>
            <div className="ws-layout">
                <SideMenu
                    item={items}
                    selectedKey={"/workspacePage/create"}
                    {...props}
                />

                <div className='ws-content'>
                    <div className="ws-content-box">
                        {renderRoutes(router)}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Workspace;
