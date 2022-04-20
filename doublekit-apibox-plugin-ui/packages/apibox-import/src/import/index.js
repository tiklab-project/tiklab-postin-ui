
import React, {useState} from 'react';
import { Button, Modal,Menu } from 'antd';
import './import.css';

const Iport = (props) =>{

     const [visible, setVisible] = useState(false);
     const showModal = () => {
          setVisible(true) 
     }
     const onCancel = () =>  { setVisible(false) }
     const handleOk = () =>  setVisible(false) 


     const menu = (
          <Menu>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
              </a>
            </Menu.Item>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
              </a>
            </Menu.Item>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
              </a>
            </Menu.Item>
          </Menu>
        );

     return (
     <>
          <Button onClick={showModal}>+导入</Button>
          <Modal
               // footer={null}
               centered
               visible={visible}
               onCancel={onCancel}
               onOk={handleOk}
          >
               
               导入11111
               <button type='button' className='aaa'>111</button>
          </Modal>
     </>
     )
}

export default Iport;
