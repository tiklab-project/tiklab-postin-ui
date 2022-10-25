import React, {useState} from "react";
import {Drawer, Select, Tag} from "antd";

const {Option} = Select;

const DynamicDrawer = (props)=>{
    const {dynamicStore,workspaceId} = props;
    const {findDynamicList} = dynamicStore;

    const [dynamicList, setDynamicList] = useState([]);
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        findDynamicList({workspaceId:workspaceId}).then(res=>{
            setDynamicList(res)
        })


        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };



    const showDynamic = (data)=>{
        return data&&data.map(item=>{
            return (
                <div className={"dynamic-drawer-item"} key={item.id}>

                    <div className={"dynamic-drawer-detail"}>
                        <div className={"dynamic-drawer-detail-left"}>
                            <div className={"dynamic-drawer-username dynamic-drawer-same"} >{item.user?.name}</div>
                            <div className={" dynamic-drawer-same"} >{showDynamicType(item.dynamicType)}</div>
                            <div className={" dynamic-drawer-same"} ><Tag > {showModelType(item.model)}</Tag></div>
                            <div className={"dynamic-drawer-name dynamic-drawer-same"}><Tag >{item.name}</Tag></div>
                        </div>


                    </div>
                    <div className={"dynamic-drawer-time"}>{item.operationTime}</div>
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

    const changeSelect = (model) =>{

        let param = {
            workspaceId:workspaceId,
            model:model
        }
        findDynamicList(param)
    }


    return(
        <>
            <a onClick={showDrawer}>更多</a>
            <Drawer
                title="动态详情"
                placement="right"
                onClose={onClose}
                open={visible}
                width={420}
            >
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
                    {
                        showDynamic(dynamicList)
                    }
                </div>
            </Drawer>
        </>

    )
}

export default DynamicDrawer;