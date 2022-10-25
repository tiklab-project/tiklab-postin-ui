import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Drawer, Dropdown, Menu, Space} from "antd";
import InstanceDetail from "./instanceDetail";
import {DownOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import {TextMethodType} from "../../../common/methodType";
import "./instanceStyle.scss"

const HistroyList = (props) =>{
    const {instanceStore,testcaseId} = props;
    const {findInstanceList,instanceList,deleteInstance} = instanceStore;

    const userId = getUser().userId;

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        findList()

        setVisible(true);
    };

    const findList = ()=>{
        let params={
            "httpCaseId":testcaseId,
            "userId":userId,
        }
        findInstanceList(params)
    }

    const onClose = () => {
        setVisible(false);
    };

    const deleteFn = (id)=>{
        deleteInstance(id).then(()=> findList())
    }

    const showInstanceList = (data)=>{
        return data&&data.map(item=>{
            return (
                <div key={item.id} className={"history-list-item"}>
                    <InstanceDetail
                        key={item.id}
                        instanceId={item.id}
                        item={
                            <>
                                <div className={"history-list-item-url"}>{item.requestInstance?.url}</div>
                                <Space size={"middle"}>
                                    <TextMethodType type={item.requestInstance?.methodType} />
                                    <span className={"qt-left-list-li-status"}>{item.statusCode}</span>
                                    <span>{item.time}ms</span>
                                    <span>{item.createTime}</span>
                                </Space>
                            </>
                        }
                    />
                    <svg className="history-list-item-icon" aria-hidden="true" onClick={()=>deleteFn(item.id)}>
                        <use xlinkHref= {`#icon-shanchu1`} />
                    </svg>
                </div>
            )
        })
    }




    return(
        <div className={"case-history-box"}>
            <a onClick={showDrawer}>
                历史记录
            </a>
            <Drawer
                title="历史记录"
                placement="right"
                onClose={onClose}
                open={visible}
            >

                {
                    showInstanceList(instanceList)
                }
            </Drawer>
        </div>
    )

}

export default inject("instanceStore")(observer(HistroyList));