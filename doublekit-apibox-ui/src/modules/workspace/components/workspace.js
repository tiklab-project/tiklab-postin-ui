/*
 * @Description: workspace左侧导航栏
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 16:57:18
 */

import React, { Fragment, useState } from 'react';
import { renderRoutes } from "react-router-config";
import { UnorderedListOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import './workspace.scss';
import SideMenu from "../../common/sideMenu";

const {  Sider } = Layout;

const Workspace = (props) => {
    const router = props.route.routes;

    //空间列表左侧导航列表
    const items = [
        {
            title: '所有空间',
            icon: 'icon-modular',
            key: `/workspace/alllist`
        },
        {
            title: `最近浏览`,
            icon: 'icon-modular',
            key: `/workspace/recently`
        },
        {
            title: '我创建的空间',
            icon: 'icon-modular',
            key: `/workspace/create`
        },
        {
            title: '我参与的空间',
            icon: 'icon-modular',
            key: `/workspace/participation`
        },
        {
            title: '我关注的空间',
            icon: 'icon-modular',
            key: `/workspace/follow`
        }
    ];

    const [selectKey,setSelectKey] = useState(`/workspace/alllist`);

    /**
     * 点击左侧菜单，设置路由地址
     * @param {*} key
     */
    const selectKeyFun = (key)=>{
        setSelectKey(key);
        props.history.push(key);
    }



    return(
        <Fragment>
            <div className="ws-layout">
                <SideMenu
                    item={items}
                    selectedKey={"/workspace/alllist"}
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
