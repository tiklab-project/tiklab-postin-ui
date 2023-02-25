/*
 * @Description: 接口详情，测试，mock 的切换
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:44:07
 */

import React from 'react';
import { renderRoutes } from "react-router-config";
import MenuCommon from "../../../../common/menu/menuCommon";
import {Breadcrumb} from "antd";
import EnvSelect from "../../../../support/environment/components/envSelect";


const ApxMethod = (props) =>  {
    const router = props.route.routes;

    const items = [
        {
            title: '接口文档',
            key: '/workspace/apis',
            // icon: <ApiOutlined />,
        },
        {
            title: '接口调试',
            key: '/workspace/apis/test',
            // icon: <RetweetOutlined />,
        },{
            title: 'Mock',
            key: '/workspace/apis/mock',
            // icon: <SnippetsOutlined />,
        }
    ];


    return(
        <div className={"content-margin"} style={{height:" calc(100% - 48px)"}}>
            <div className="content-margin-box">
                {
                    renderRoutes(router)
                }
            </div>
        </div>
    )

}

export default ApxMethod;
