import React, { useState} from "react";
import {inject, observer} from "mobx-react";
import {Drawer,  Space} from "antd";
import InstanceDetail from "./InstanceDetail";
import {getUser} from "thoughtware-core-ui";
import {TextMethodType} from "../../../../../common/MethodType";
import "./instanceStyle.scss"
import IconCommon from "../../../../../common/IconCommon";



const HistoryList = (props) =>{
    const {testcaseId,instanceStore} = props;
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


    const showHistoryView = ()=>{
        if(props.icon){
            return <IconCommon
                    icon={"lishi"}
                    className={"icon-s "}
                    style={{margin:"5px 0 0 0",cursor:"pointer"}}
                    onClick={showDrawer}
                />
        }else {
            return <a onClick={showDrawer}>历史记录</a>
        }
    }


    return(
        <div className={"case-history-box"}>
            {showHistoryView()}
            <Drawer
                title="历史记录"
                placement="right"
                onClose={onClose}
                visible={visible}
            >

                {
                    showInstanceList(instanceList)
                }
            </Drawer>
        </div>
    )

}

export default inject("instanceStore")(observer(HistoryList));