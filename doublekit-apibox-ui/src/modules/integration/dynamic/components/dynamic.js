import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import "./dynamicStyle.scss"
import {Select, Tag} from "antd";
import DynamicDrawer from "./dynamicDrawer";

const {Option} = Select;


const Dynamic = (props) =>{
    const {dynamicStore,workspaceId} = props;
    const {findDynamicList} = dynamicStore;

    const [dynamicList, setDynamicList] = useState();

    useEffect(()=>{
        refresh();
    },[workspaceId])

    const showDynamic = (data)=>{
        return data&&data.map(item=>{
            return (
                <div className={"dynamic-item"} key={item.id}>
                    <svg className="dynamic-item-icon" aria-hidden="true">
                        <use xlinkHref= {`#icon-user__easyico`} />
                    </svg>

                    <div className={"dynamic-item-detail"}>
                        <div className={"dynamic-item-detail-left"}>
                            <div className={"dynamic-item-username dynamic-item-same"} >{item.user?.name}</div>
                            <div className={" dynamic-item-same"} >{showDynamicType(item.dynamicType)}</div>
                            <div className={" dynamic-item-same"} ><Tag > {showModelType(item.model)}</Tag></div>
                            <div className={"dynamic-item-name dynamic-item-same"}><Tag >{item.name}</Tag></div>
                        </div>

                        <div className={"dynamic-item-time"}>{item.operationTime}</div>
                    </div>

                </div>
            )
        })
    }

    const showDynamicType = (type) =>{
        switch (type) {
            case "add":
                return <Tag color="blue">  新增  </Tag>
            case "edit":
                return <Tag color="green"> 更新 </Tag>
            case "delete":
                return <Tag color="red"> 删除 </Tag>
        }
    }

    const showModelType = (type) =>{
        switch (type) {
            case "category":
                return "目录"
            case "api":
                return "接口"
            case "case":
                return "用例"
            case "model":
                return "数据模型"
            case "member":
                return "成员"
        }
    }

    const refresh =()=>{
        let param = { workspaceId:workspaceId }
        findDynamicList(param).then(res=>{
            setDynamicList(res.data)
        })
    }

    const changeSelect = (model) =>{

        let param = {
            workspaceId:workspaceId,
            model:model
        }
        findDynamicList(param).then(res=>{
            setDynamicList(res.data)
        })
    }

    return(
        <>
            <div className={"dynamic-header"}>
                <div>
                    <Select bordered={false} placeholder="用户">
                        <Option> </Option>
                    </Select>
                    <Select bordered={false} placeholder="类型" onChange={changeSelect}>
                        <Option >所有</Option>
                        <Option value={"category"}>目录</Option>
                        <Option value={"api"}>接口</Option>
                    </Select>
                </div>
                <div>
                    <div onClick={refresh} className={"dynamic-header-refresh"}>刷新</div>
                    <DynamicDrawer
                       workspaceId={workspaceId}
                       {...props}
                    />
                </div>

            </div>
            {
                showDynamic(dynamicList)
            }
        </>
    )
}

export default inject("dynamicStore")(observer(Dynamic));