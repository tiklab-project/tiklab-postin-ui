/*
 * @Description: 接口的添加与编辑
 * @Author: sunxiancheng
 * @update: 2021-05-08 17:45:07
 */

import React, { Fragment, useState } from 'react';
import {observer, inject} from 'mobx-react';
import {Modal, Form, Input, Button, Select, Cascader} from 'antd';
import environmentStore from "../store/environmentStore";
import IconCommon from "../../../common/IconCommon";

const {Option} = Select;
const {TextArea} = Input;

/**
 * 接口
 * http
 * 新增 编辑 弹框
 */
const EnvironmentEdit = (props) => {
    const {type,envData,findList} = props
    const {
        createEnvironment,
        updateEnvironment,
    } = environmentStore;

    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();

    const workspaceId = localStorage.getItem('workspaceId');

    /**
     * 展示弹框
     */
    const showModal = () => {
        if(type!=="add"){
            form.setFieldsValue(envData)
        }

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

        if(type==="add"){
            values.workspaceId = workspaceId
             await createEnvironment(values)
        }else {
            let param = {
                ...envData,
                ...values
            }
            await updateEnvironment(param)
        }

        await findList();

        setVisible(false);
    };

    /**
     * 展示组件
     */
    const showView = () =>{
        if(type==="add"){
            return <Button
                className={"important-btn"}
                onClick={showModal}
                type="primary"
            >
                添加
            </Button>
        }else {
            return  <IconCommon
                icon={"bianji11"}
                className={"icon-s edit-icon"}
                onClick={showModal}
            />
        }
    }


    return(
        <Fragment>
            {showView()}
            <Modal
                destroyOnClose={true}
                title={type==="edit"?"编辑":"添加"}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    preserve={false}
                    form={form}
                    layout={"vertical"}

                >
                    <Form.Item
                        label="环境名称"
                        name="name"
                        rules={[{
                            required: true,
                            message: '添加环境名称'
                        }]}
                    >
                        <Input placeholder={"请输入名称"}/>
                    </Form.Item>
                    <Form.Item
                        label="环境地址"
                        name="url"
                        rules={[
                            { required: true, message: '添加环境地址' },
                            { type: 'url', message: '请输入有效的 URL 地址' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default observer(EnvironmentEdit);
