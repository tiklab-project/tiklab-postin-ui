import React from 'react';
import {observer} from "mobx-react";
import {Tabs} from "antd";
import RequestHeaderTestWS from "./RequestHeaderTestWS";
import QueryTestWS from "./QueryTestWS";
import RawTestWS from "./RawTestWS";

/**
 * 请求中的tab组件
 */
const RequestTestWS = (props) => {


    return(
        <Tabs
            className="tabs"
            size={"small"}
            items={[
                {
                    label: `请求体`,
                    key: '1',
                    children: <RawTestWS />
                },
                {
                    label: `请求头`,
                    key: '2',
                    children: <div className={"tabPane-item-box"}><RequestHeaderTestWS /></div>
                },{
                    label: `查询参数`,
                    key: '3',
                    children: <div className={"tabPane-item-box"}><QueryTestWS /></div>
                },
            ]}
        />
    )
}

export default observer(RequestTestWS);
