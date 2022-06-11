/*
 * @Description: 接口详情，测试，mock 的切换
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:44:07
 */

import React, {Fragment,useState,} from 'react';
import { renderRoutes } from "react-router-config";
import { Layout, Menu } from 'antd';
import { ApiOutlined, RetweetOutlined, SnippetsOutlined } from '@ant-design/icons';


const ApxMethod = (props) =>  {
    const router = props.route.routes;
    const [current, setCurrent] = useState('/workspacepage/apis/detail/interface');

    const items = [
        {
            label: '接口',
            key: '/workspacepage/apis/detail/interface',
            icon: <ApiOutlined />,
        },
        {
            label: '测试',
            key: '/workspacepage/apis/detail/interface/test',
            icon: <RetweetOutlined />,
        },
        {
            label: '测试用例',
            key: '/workspacepage/apis/detail/interface/testcase',
            icon: <RetweetOutlined />,
        },{
            label: 'Mock',
            key: '/workspacepage/apis/detail/interface/mock',
            icon: <SnippetsOutlined />,
        }
    ];

    const onClick = (e) => {
        setCurrent(e.key);
        props.history.push(e.key)
    };


    return(
        <Fragment>
            <div>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                />
                <div className="method-content">
                    {
                        renderRoutes(router)
                    }
                </div>
            </div>
        </Fragment>
    )

}

export default ApxMethod;
