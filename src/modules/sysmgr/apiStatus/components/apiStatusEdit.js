/*
 * @Description: 接口的添加与编辑
 * @Author: sunxiancheng
 * @update: 2021-05-08 17:45:07
 */

import React, { Fragment, useState } from 'react';
import { observer, inject } from 'mobx-react';
import {Modal, Form, Input, Button, Tooltip,} from 'antd';

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};

const ApiStatusEdit = (props) => {
    const { apxMethodStatusStore, apiStatusId } =props;

    const {findApiStatus,createApiStatus,updateApiStatus} = apxMethodStatusStore;

    const [visible,setVisible] = useState(false);

    const [form] = Form.useForm();

    // 弹框展示
    const showModal = () => {
        if(props.name==="编辑"){
            findApiStatus(apiStatusId).then(res=>{
                form.setFieldsValue({
                    name:res.name,
                    code:res.code,
                })
            })
        }
        setVisible(true);
    };

    // 弹框关闭
    const onCancel = () => { setVisible(false) };

    // 提交
    const onFinish = () => {
        form.validateFields().then(values=>{
            if(props.name==="添加状态"){
                createApiStatus(values)
            }else {
                updateApiStatus(values)
            }
        })
        setVisible(false);
    };


    return(
        <Fragment>
            {
                props.name === '添加状态'
                    ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                    : <a style={{'cursor':'pointer'}} onClick={showModal}>{props.name}</a>
            }
            <Modal
                destroyOnClose={true}
                title={props.name}
                open={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    {...layout}
                    preserve={false}
                    name="basic"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                    form={form}
                >
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[{ required: true, message: 'Please input your url!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="编码"
                        name="code"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )

}

export default inject('apxMethodStatusStore')(observer(ApiStatusEdit));
