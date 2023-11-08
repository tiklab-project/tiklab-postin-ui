import React from "react";
import {Tabs} from "antd";
import RawWSQuickTest from "./RawWSQuickTest";
import HeaderWSQuickTest from "./HeaderWSQuickTest";
import QueryWSQuickTest from "./QueryWSQuickTest";


const RequestWSQuickTest = () =>{

    return(
        <Tabs
            className="tabs"
            size={"small"}
            items={[
                {
                    label: `请求体`,
                    key: '1',
                    children: <RawWSQuickTest />
                },
                {
                    label: `请求头`,
                    key: '2',
                    children: <div className={"tabPane-item-box"}><HeaderWSQuickTest /></div>
                },{
                    label: `查询参数`,
                    key: '3',
                    children: <div className={"tabPane-item-box"}><QueryWSQuickTest /> </div>
                },
            ]}
        />
    )
}

export default RequestWSQuickTest;