import { Modal } from 'antd';
import React, { useState } from 'react';
import {inject, observer} from "mobx-react";
import dataStructureStore from "../store/DataStructureStore";

const ModeModal = (props) => {
    const {changeType,preKey} = props;
    const {findDataStructureList,dataStructureList} = dataStructureStore;

    const [isModalOpen, setIsModalOpen] = useState(false);


    let workspaceId = localStorage.getItem('workspaceId')

    const showModal = () => {
        findDataStructureList({workspaceId: workspaceId})

        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const selectModel = (data) =>{
        let mode = {
                properties: data.name,
                isModel:true,
                id:data.id
            }


        console.log(mode)


        changeType("object",preKey,mode)

        setIsModalOpen(false);
    }

    return (
        <>
            <div className={"def-mode-btn"} onClick={showModal}>模型</div>
            <Modal
                title="数据模型"
                open={isModalOpen}
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
                                onClick={()=>selectModel(item)}
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