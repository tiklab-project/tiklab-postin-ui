import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Dropdown, Menu} from "antd";
import InstanceDetail from "./instanceDetail";
import {DownOutlined} from "@ant-design/icons";
import {getUser} from "doublekit-core-ui";

const DropdownInstance = (props) =>{
    const {instanceStore,testcaseId} = props;
    const {findInstanceList,instanceList} = instanceStore;

    const userId = getUser().userId;

    useEffect(()=>{
        let params={
            "httpCaseId":testcaseId,
            "userId":userId,
        }
        findInstanceList(params)
    },[testcaseId])

    const showInstanceList = (data)=>{
        return data&&data.map(item=>{
            return (
                <Menu.Item key={item.id}>
                    <span>{item.createTime}</span>
                    <span className={"instance-list-item"}>{item.statusCode}</span>
                    <InstanceDetail instanceId={item.id}/>
                </Menu.Item>
            )
        })
    }

    const menu = (
        <Menu>
            {
                showInstanceList(instanceList)
            }
        </Menu>
    );

    return(
        <Dropdown overlay={menu} placement="bottom" trigger={"click"}>
            <a>
                历史记录  <DownOutlined />
            </a>
        </Dropdown>
    )

}

export default inject("instanceStore")(observer(DropdownInstance));