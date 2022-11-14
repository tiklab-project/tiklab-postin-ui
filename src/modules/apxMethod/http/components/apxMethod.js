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
    const [current, setCurrent] = useState('/workspace/apis/detail/interface');

    const items = [
        {
            label: '接口',
            key: '/workspace/apis/detail/interface',
            // icon: <ApiOutlined />,
        },
        {
            label: '测试',
            key: '/workspace/apis/detail/interface/test',
            // icon: <RetweetOutlined />,
        },
        {
            label: '测试用例',
            key: '/workspace/apis/detail/interface/testcase',
            // icon: <RetweetOutlined />,
        },{
            label: 'Mock',
            key: '/workspace/apis/detail/interface/mock',
            // icon: <SnippetsOutlined />,
        }
    ];

    const onClick = (e) => {
        setCurrent(e.key);
        props.history.push(e.key)
    };


    const showMenuItem =(data)=>{
        return data&&data.map(item=>{
            return(
                <Menu.Item onClick={()=>onClick(item)} key={item.key}>{item.label}</Menu.Item>
            )
        })
    }


    return(
        <div className={"api-content-box"}>
            <Menu
                selectedKeys={[current]}
                mode="horizontal"
            >
                {showMenuItem(items)}
            </Menu>
            <div className={"content-margin"}>
                <div className="content-margin-box">
                    {
                        renderRoutes(router)
                    }
                </div>

            </div>
        </div>
    )

}

export default ApxMethod;
