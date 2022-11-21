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
            <div style={{ margin: "20px 20px 5px 10px" }}>
                <div style={{
                    maxWidth: "1440px",
                    "minWidth":"800px",
                    "margin":"0 auto",
                    // boxShadow: "rgb(0 0 0 / 76%) 0px 5px 5px -8px"
                }}>
                    <Menu
                        selectedKeys={[current]}
                        mode="horizontal"
                    >
                        {showMenuItem(items)}
                    </Menu>
                </div>
            </div>

            <div className={"content-margin"} style={{height:" calc(100% - 48px)"}}>
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
