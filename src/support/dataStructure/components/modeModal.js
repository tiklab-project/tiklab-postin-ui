import { Modal } from 'antd';
import React, { useState } from 'react';
import {observer} from "mobx-react";
import dataStructureStore from "../store/DataStructureStore";
import jsonParamDSStore from "../store/JsonParamDSStore";
import {schemaToTable} from "../../../common/JsonSchemaTable/JsonSchemaFn";
import "./structureStyle.scss"


const ModeModal = (props) => {
    const {selectModel} = props
    const {findDataStructureList,dataStructureList} = dataStructureStore;
    const {findJsonParamDS} = jsonParamDSStore

    const [open, setOpen] = useState(false);


    let workspaceId = localStorage.getItem('workspaceId')

    const showModal = () => {
        findDataStructureList({workspaceId: workspaceId})

        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const selectFn =async (data) =>{
        const jsonSchemaInfo = await findJsonParamDS(data.id)
        const jsonScheme=JSON.parse(jsonSchemaInfo.jsonText)

        let modelData = {
            name:data.name,
            jsonScheme:schemaToTable(jsonScheme.properties,jsonScheme.required),
            model:true
        }
        selectModel(modelData)

        setOpen(false)
    }

    return (
        <>
            <div className={"def-mode-btn"} onClick={showModal}>模型</div>
            <Modal
                title="数据模型"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                width={600}
            >
                <ul style={{minHeight: "400px",maxHeight: "400px"}}>
                    {
                        dataStructureList&&dataStructureList.map(item=> (
                            <li
                                className={"def-mode-li"}
                                key={item.id}
                                onClick={()=>selectFn(item)}
                            >
                                {item.name}
                            </li>
                        ))
                    }

                </ul>
            </Modal>
        </>
    );
};

export default observer(ModeModal);