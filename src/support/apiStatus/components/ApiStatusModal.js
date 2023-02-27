import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Tag} from "antd";
import {inject, observer} from "mobx-react";
import { SketchPicker } from 'react-color';

const ApiStatusModal = (props) =>{
    const {apxMethodStatusStore} = props;
    const {findApiStatusList,createApiStatus,deleteApiStatus} = apxMethodStatusStore;

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [statusList, setStatusList] = useState([]);
    const [customList, setCustomList] = useState([]);
    let workspaceId = localStorage.getItem("workspaceId")

    useEffect(()=>{
        findApiStatusList({type:"system"}).then(res=>{
            setStatusList(res)
        });
    },[])

    useEffect(()=>{
        findCustomList()
    },[])

    const findCustomList = () =>{
        let param = {type:"custom",workspaceId:workspaceId}
        findApiStatusList(param).then(res=>{
            setCustomList(res)
        });
    }

    const showSystemStatus = (list) =>{
        return list&&list.map(item=>{
            return(
                <Tag  key={item.id}  color={item.color}>{item.name}</Tag>
            )
        })
    }

    const showCustomStatus = (list) =>{
        return list&&list.map(item=>{
            return(
                <Tag
                    key={item.id}
                    color={item.color}
                    closable
                    onClose={()=>onClose(item.id)}
                >
                    {item.name}
                </Tag>
            )
        })
    }

    const onSave = async ()=>{
        let value = await form.getFieldsValue();
        value.type="custom";
        value.workspaceId = workspaceId;
        value.color=color;
        createApiStatus(value).then(()=>findCustomList())
    }

    const onClose = (id) =>{
        deleteApiStatus(id).then(()=>findCustomList())
    }


    const showModal = () => setIsModalVisible(true);

    const handleOk = () =>  setIsModalVisible(false);

    const handleCancel = () =>  setIsModalVisible(false);

    const [color, setColor] = useState("#F06161");

    const toggleColorPick = () =>{
        return <div className={"status-color-box"}>
            <div className={`status-color-box-select`} style={{"background":`${color}`}}> </div>
            <div className={"status-color-box-picker"}>
                <SketchPicker  color={color} onChangeComplete={(color)=>setColor(color.hex)}/>
            </div>

        </div>
    }


    return(
        <>
            <a  style={{"color":"#00adff","cursor":"pointer","margin":"0 0 0 20px"}} onClick={showModal}>状态设置</a>
            <Modal
                title="接口状态"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                width={600}
                bodyStyle={{padding:0}}
                destroyOnClose={true}
            >
                <div style={{minHeight: 400}}>
                    <div className={"api-status-title"}>系统</div>
                    <div className={"api-status-system-box"}>
                        {
                            showSystemStatus(statusList)
                        }
                    </div>
                    <div className={"api-status-title"}>新增状态</div>
                    <div className={"api-status-bottom"}>
                        <div className={"api-status-create"}>
                            <Form  preserve={false} form={form}>
                                <Form.Item  name="name"  >
                                    <Input style={{width:450}}  placeholder={"状态名称"} />
                                </Form.Item>
                            </Form>
                            {/*<SketchPicker color={color} onChangeComplete={(color)=>setColor(color.hex)}/>*/}
                            {
                                toggleColorPick()
                            }
                            <Button type="primary" onClick={onSave}>新建</Button>
                        </div>
                    </div>
                    <div className={"api-status-title"}>自定义</div>
                    <div className={"api-status-custom-box"}>
                        {
                            showCustomStatus(customList)
                        }
                    </div>

                </div>

            </Modal>
        </>
    )
}

export default inject('apxMethodStatusStore')(observer(ApiStatusModal));