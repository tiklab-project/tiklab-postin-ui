import React from 'react';

import {observer} from "mobx-react";
import {Tabs} from "antd";
import RequestHeader from "../../../api/components/RequestHeader";
import QueryParam from "../../../api/components/QueryParam";
import RequestBodyWS from "./RequestBodyWS";


/**
 * 请求中的tab组件
 */
const RequestWS = (props) => {


    return(
        <Tabs
            className="tabs"
            size={"small"}
            items={[
                {
                    label: `请求体`,
                    key: '1',
                    children: <RequestBodyWS />
                },
                {
                    label: `请求头`,
                    key: '2',
                    children: <div className={"tabPane-item-box"}><RequestHeader/></div>
                },{
                    label: `查询参数`,
                    key: '3',
                    children: <div className={"tabPane-item-box"}><QueryParam /></div>
                },
            ]}
        />

    )
}

export default observer(RequestWS);
