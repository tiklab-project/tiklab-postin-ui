/*
 * @Description: 接口详情，测试，mock 的切换
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:44:07
 */

import React from 'react';
import { renderRoutes } from "react-router-config";
import MenuCommon from "../../../common/menu/menuCommon";


const ApxMethod = (props) =>  {
    const router = props.route.routes;

    const items = [
        {
            title: '接口',
            key: '/workspace/apis/detail/interface',
            // icon: <ApiOutlined />,
        },
        {
            title: '测试用例',
            key: '/workspace/apis/detail/interface/testcase',
            // icon: <RetweetOutlined />,
        },{
            title: 'Mock',
            key: '/workspace/apis/detail/interface/mock',
            // icon: <SnippetsOutlined />,
        }
    ];

    return(
        <div className={"api-content-box"}>
            <div style={{"borderBottom":"1px solid #dddddd",background:"#fff"}}>
                <div style={{
                    // maxWidth: "1440px",
                    "minWidth":"800px",
                    "margin":"0 auto",
                    // boxShadow: "rgb(0 0 0 / 76%) 0px 5px 5px -8px"
                }}>
                    <MenuCommon
                        items={items}
                        selectedKey={"/workspace/apis/detail/interface"}
                        {...props}
                    />
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
