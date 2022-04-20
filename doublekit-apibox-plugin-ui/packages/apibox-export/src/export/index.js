import React, {useState} from 'react';
import { Button, Modal,  } from 'antd'
import './export.css'


const Eport = () =>{
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true) 
    const onCancel = () =>  {
         setVisible(false)
     }
    const handleOk = () =>  setVisible(false) 

    return (
    <>
        <a onClick={showModal}>导出</a>
        <Modal
            // footer={null}
            centered
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
        >
            导出
        </Modal>

    </>
    )


 
}

export default Eport;
