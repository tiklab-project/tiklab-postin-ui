import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import { Form, Modal, Button, Input } from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20,},
};

const MockEdit = (props) => {
    const { mockStore, apxMethodStore, setEdit } = props;
    const { findMock, createMock, updateMock } = mockStore;
    const { findApxMethod } = apxMethodStore;

    const [visible, setVisible] = useState(false);
    const [enable,setEnable] = useState()

    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
        if(props.type === '编辑') {
            showApxMethodName();
            findMock(props.id).then((res)=>{
                setEnable(res.enable)
                form.setFieldsValue({
                    name:res.name,
                    desc:res.desc
                })
            })
        }else{
            showApxMethodName();
        }
    };

    const apxMethodId = localStorage.getItem('apxMethodId');
    // 弹框展示mock接口
    const showApxMethodName = () => {
        findApxMethod(apxMethodId).then((res)=> {
            form.setFieldsValue({
                path: res.path,
            })
        })
    }

    const onFinish = () => {
        form.validateFields().then((values)=>{
            if(props.type === '编辑') {
                values.id = props.id;
                values.enable = enable;
                updateMock(values).then(()=>{
                    setEdit(true)
                })
            }else{
                values.enable=0
                createMock(values)
            }
        })
        setVisible(false)
    };

    const onCancel = () => {setVisible(false)};

    return(
        <>
        {
            props.btn === 'btn'
                ? <Button className="important-btn" onClick={showModal}>{props.type}</Button>
                : <a style={{'cursor':'pointer'}} onClick={showModal}>{props.type}</a>
        }
        <Modal
            destroyOnClose={true}
            title={props.type}
            visible={visible}
            onCancel={onCancel}
            onOk={onFinish}
            okText="提交"
            cancelText="取消"
        >
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
                preserve={false}
            >
                <Form.Item
                    label="mock接口"
                    name="path"
                    rules={[ {required: true} ]}
                >
                    <Input disabled/>
                </Form.Item>

                <Form.Item
                    label="mock名称"
                    name="name"
                    rules={[{
                            required: true,
                            message: '添加Mock名称!'
                        }]}
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
