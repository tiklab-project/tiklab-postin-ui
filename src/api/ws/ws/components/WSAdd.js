/*
 * @Description: 接口的添加与编辑
 * @Author: sunxiancheng
 * @update: 2021-05-08 17:45:07
 */

import React, { Fragment, useState } from 'react';
import {observer} from 'mobx-react';
import {Modal, Form, Input} from 'antd';
import apiStore from "../../../api/store/APIStore";

const {TextArea} = Input;

/**
 * WS
 * 新增 弹框
 */
const WSAdd = (props) => {
    const {curCategoryId} = props

    const {createApi} = apiStore;

    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();

    const categoryId = localStorage.getItem("categoryId");
    const workspaceId = localStorage.getItem('workspaceId');
    
    /**
     * 展示弹框
     */
    const showModal = () => {
        setVisible(true);
    };


    /**
     * 弹框关闭
     */
    const onCancel = () => {
        setVisible(false);
    };

    /**
     * 提交
     */
    const onFinish =  async () => {
        let values =await form.validateFields()

        values.workspaceId=workspaceId;
        values.protocolType="ws";
        values.category={id:curCategoryId?curCategoryId:categoryId},

        createApi(values).then((res)=>{
            localStorage.setItem('apiId',res.data);
            props.history.push("/workspace/apis/ws/design");
        })

        setVisible(false);
    };
    
    return(
        <Fragment>
            <a onClick={showModal}> {props.name}</a>
            <Modal
                destroyOnClose={true}
                title={props.type==="edit"?"编辑":"添加"}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    preserve={false}
                    initialValues={{ methodType: "get" }}
                    form={form}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="接口名称"
                        name="name"
                        rules={[{ required: true, message: '输入接口名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="接口路径"
                        name="path"
                        rules={[{ required: true, message: '输入接口路径!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="desc"
                    >
                        <TextArea  rows={4}  placeholder="描述"/>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default observer(WSAdd);
