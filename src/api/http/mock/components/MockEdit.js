import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import { Form, Modal, Input } from 'antd';
import IconBtn from "../../../../common/iconBtn/IconBtn";
import IconCommon from "../../../../common/IconCommon";

const MockEdit = (props) => {
    const { mockStore, } = props;
    const { findMock, createMock, updateMock, findMockPage} = mockStore;


    const [visible, setVisible] = useState(false);
    const [enable,setEnable] = useState()

    const [form] = Form.useForm();

    const apxMethodId =  localStorage.getItem('apxMethodId');

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
            values.enable=0
            createMock(values).then(()=>{
                findMockPage(apxMethodId)
            })
        }

        setVisible(false)
    };

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

export default inject('apxMethodStore')(observer(MockEdit));
