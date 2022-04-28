/*
 * @Description: 添加与编辑空间组件
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:22:18
 */

import React from 'react';
import { observer, inject } from "mobx-react";
import { Form, Modal, Button, Input } from 'antd';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const WorkspaceEdit = (props) => {
    const { workspaceStore, workspaceId,userId } = props;
    const {
        findWorkspace,
        createWorkspace,
        updateWorkspace
     } = workspaceStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    /**
     * 弹框展示
     */
    const showModal = () => {
        setVisible(true);
        if(props.type === "edit"){
            findWorkspace(workspaceId).then((res)=>{
                form.setFieldsValue({
                    workspaceName: res.workspaceName,
                    desc:res.desc
                })
            })
        }
    };

    /**
     * 提交
     */
    const onFinish = () => {
        form.validateFields().then((values)=>{
            values.user = {id:userId};
            if(props.type === "add" ){
                createWorkspace(values);
            }else{
                updateWorkspace(values);
            }
        })
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
        {
            props.type === 'add'
                ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                : <a style={{'cursor':'pointer'}} onClick={showModal}>{props.name}</a>
        }
        <Modal
            destroyOnClose={true}
            title={props.name}
            visible={visible}
            onCancel={onCancel}
            onOk={onFinish}
            okText="提交"
            cancelText="取消"
            centered
        >
            <Form
                {...layout}
                className='ws-edit-modal-form'
                name="basic"
                initialValues={{ remember: true }}
                form={form}
                onFinish={onFinish}
                preserve={false}
            >
                <Form.Item
                    label="应用名称"
                    rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}
                    name="workspaceName"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="desc"
                >
                     <Input />
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export default inject('workspaceStore')(observer(WorkspaceEdit));
