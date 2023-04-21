import React, {useState} from "react";
import {Modal, Tabs} from "antd";
import "./globalParamStyle.scss"
import GlobalHeader from "./header/GlobalHeader";

const {TabPane} = Tabs;

const GlobalParamModal = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return(
        <>
            <div className={"global-param-btn"} onClick={showModal}>全局</div>
            <Modal
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={960}
                footer={false}
            >
                <Tabs >
                    <TabPane tab={"Header"}>
                        <div className={"tabPane-item-box"}><GlobalHeader  /></div>
                    </TabPane>

                </Tabs>

            </Modal>
        </>
    )
}
export default GlobalParamModal;