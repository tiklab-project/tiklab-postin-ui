import React, { Fragment, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Modal,Form,Input} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 目录的编辑与添加
const CategoryEdit =(props)=>{
    const { categoryStore,type } = props;
    const {findCategory, createCategory, updateCategory, categoryId} = categoryStore;

    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();

    const workspaceId = localStorage.getItem('workspaceId');

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.name === "编辑"){
            findCategory(props.categoryId?props.categoryId:categoryId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                })
            })
        }
    };


    // 收起弹框
    const hideModal = () => {setVisible(false)};

    // 弹框提交
    const onFinish = () => {
        form.validateFields().then(values => {
            if(props.name === '编辑'){
                updateCategory(values);
            }else{
                values.type = type
                values.workspace = {id:workspaceId}
                values.parentCategory = {
                    id:values.parentCategory?values.parentCategory:props.categoryId,
                }
                createCategory(values);
            }
            setVisible(false)
        })
    };

    return(
        <Fragment>
            <a onClick={showModal}>{props.name}</a>
            <Modal
                title="添加目录"
                open={visible}
                onCancel={hideModal}
                destroyOnClose={true}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    form={form}
                    preserve={false}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="目录名称"
                        name="name"
                        rules={[{ required: true, message: '添加目录名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )

}

export default inject('categoryStore')(observer(CategoryEdit));
