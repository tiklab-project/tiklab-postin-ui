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

const {  Sider } = Layout;

const Workspace = (props) => {
    const router = props.route.routes;

    //空间列表左侧导航列表
    const routers = [
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

    /**
     *左侧导航循环渲染
     */
    const renderList = () => {
       return  routers && routers.map(Item=> {
            return (
                <li key={Item.key} >
                    <div className={`ws-menu-li ${Item.key=== selectKey ? "ws-menu-li-action" : ""}`}
                         key={Item.key}
                         onClick={()=>selectKeyFun(Item.key)}
                    >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#${Item.icon}`}></use>
                        </svg>
                        <span >
                            {Item.title}
                        </span>
                    </div>
                </li>
            )
        })
    }

    return(
        <Fragment>
            <Layout className="ws-layout">
                <Sider
                    theme="light"
                    width='240'
                >
                <ul className="ws-menu-ul">
                    {
                        renderList()
                    }
                </ul>
                </Sider>
                <Layout className='ws-content'>
                    <div className="ws-content-box">
                        {renderRoutes(router)}
                    </div>
                </Layout>
            </Layout>
        </Fragment>
    )
}

export default Workspace;
