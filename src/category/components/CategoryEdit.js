import React, { Fragment, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Modal,Form,Input} from 'antd';
import categoryStore from "../store/CategoryStore";
/**
 * 目录的编辑与添加弹窗
 */
const CategoryEdit =(props)=>{
    const {type } = props;
    const {findCategory, createCategory, updateCategory, categoryId,findNodeTree} = categoryStore;

    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();
    const [categoryInfo, setCategoryInfo] = useState();

    const workspaceId = localStorage.getItem('workspaceId');

    /**
     * 弹框展示
     */
    const showModal = async () => {
        if(type === "edit"){
            let res = await findCategory(props.categoryId?props.categoryId:categoryId)
            form.setFieldsValue({
                name: res.node.name,
            })
            setCategoryInfo(res)
        }

        setVisible(true);
    };


    /**
     * 收起弹框
     */
    const hideModal = () => {setVisible(false)};

    /**
     *  弹框提交
     */
    const onFinish = async () => {
        let values = await form.validateFields();

        if(type === 'edit'){
            let param= {
                id:categoryInfo.id,
                node:{
                    ...categoryInfo.node,
                    ...values
                }
            }
            await updateCategory(param);
        }else{
            values.node = {
                name:values.name,
                workspaceId:workspaceId,
                parentId:values.parent?values.parent:props.categoryId,
            }

            await createCategory(values);
        }

        await findNodeTree({workspaceId:workspaceId})

        setVisible(false)
    };

    return(
        <Fragment>
            <a onClick={showModal}>{props.name}</a>
            <Modal
                title={type==="edit"?"编辑":"添加"}
                visible={visible}
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

export default observer(CategoryEdit);
