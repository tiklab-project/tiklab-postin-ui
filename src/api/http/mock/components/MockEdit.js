import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import { Form, Modal, Input } from 'antd';
import IconBtn from "../../../../common/iconBtn/IconBtn";
import IconCommon from "../../../../common/IconCommon";
import mockStore from "../store/MockStore";
/**
 * mock添加 弹窗
 */
const MockEdit = (props) => {
    const { findMock, createMock, updateMock, findMockPage} = mockStore;

    const [visible, setVisible] = useState(false);
    const [enable,setEnable] = useState()

    const [form] = Form.useForm();

    const apxMethodId =  localStorage.getItem('apxMethodId');

    /**
     * 展示弹框
     * 如果是编辑回显数据
     */
    const showModal = () => {
        if(props.type === 'edit') {
            findMock(props.mockId).then((res)=>{
                setEnable(res.enable)
                form.setFieldsValue({
                    name:res.name,
                    desc:res.desc
                })
            })
        }

        setVisible(true);
    };

    /**
     * 保存或者更新数据
     */
    const onFinish = async () => {
        let values = await form.validateFields();

        values.http={id:apxMethodId}
        if(props.type === 'edit') {
            values.id = props.mockId;
            values.enable = enable;
            updateMock(values).then(()=>{
                findMockPage(apxMethodId)
            })
        }else{
            values.enable=1
            createMock(values).then(()=>{
                findMockPage(apxMethodId)
            })
        }

        setVisible(false)
    };

    /**
     * 关闭弹窗
     */
    const onCancel = () => {setVisible(false)};

    return(
        <>
        {
            props.btn === 'btn'
                ? <IconBtn
                    className="important-btn"
                    onClick={showModal}
                    name={"添加MOCK"}
                />
                : <IconCommon
                    icon={"bianji11"}
                    className={"icon-s edit-icon"}
                    onClick={showModal}
                />
        }
        <Modal
            destroyOnClose={true}
            title={props.type==="edit"?"编辑":"添加"}
            visible={visible}
            onCancel={onCancel}
            onOk={onFinish}
            okText="提交"
            cancelText="取消"
        >
            <Form
                form={form}
                onFinish={onFinish}
                preserve={false}
                layout={"vertical"}
            >
                <Form.Item
                    label="mock名称"
                    name="name"
                    rules={[{  required: true,  message: '添加Mock名称!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label="描述"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

export default observer(MockEdit);
