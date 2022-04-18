/*
 * @Description: 接口详情，测试，mock 的切换
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:44:07
 */

import React, { Fragment, useEffect,  } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import { Layout, Menu } from 'antd';
import { ApiOutlined, RetweetOutlined, SnippetsOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;
const { SubMenu } = Menu;

const ApxMethod = (props) =>  {

    const router = props.route.routes;

    return(
        <Fragment>
            <Layout>
                <Header className="method-header">
                    <div className="method-menu-box">
                    <Menu
                        mode="horizontal"
                        className="method-menu"
                    >
                        <Menu.Item key="method" icon={<ApiOutlined />}>
                            <Link to='/workspacepage/apis/detail/interface'>接口</Link>
                        </Menu.Item>
                        <Menu.Item key="test" icon={<RetweetOutlined />} >
                            <Link to='/workspacepage/apis/detail/interface/test'>测试</Link>
                        </Menu.Item>
                        <Menu.Item key="testcase" icon={<RetweetOutlined />}>
                            <Link to={{pathname:'/workspacepage/apis/detail/interface/testcase'}}>测试用例</Link>
                        </Menu.Item>
                        <Menu.Item key="mock"  icon={<SnippetsOutlined />} >
                            <Link to='/workspacepage/apis/detail/interface/mock'>Mock</Link>
                        </Menu.Item>
                    </Menu>
                    </div>
                </Header>
                <Content className="method-content">
                {
                    renderRoutes(router)
                }
                </Content>
            </Layout>
        </Fragment>
    )

}

export default ApxMethod;
