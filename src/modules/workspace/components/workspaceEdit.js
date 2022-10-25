/*
 * @Description: 添加与编辑空间组件
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:22:18
 */
import React from 'react';
import { observer, inject } from "mobx-react";
import { Form, Modal, Button, Input } from 'antd';


const WorkspaceEdit = (props) => {
    const { workspaceStore, workspaceId,findList,selectItem } = props;
    const {
        findWorkspace,
        createWorkspace,
        updateWorkspace,
        menuSelected
     } = workspaceStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    /**
     * 弹框展示
     */
    const showModal = async () => {

        if(props.type === "edit"){
            let res = await findWorkspace(workspaceId)
            form.setFieldsValue({
                workspaceName: res.workspaceName,
                desc:res.desc
            })
        }

        setVisible(true);
    };

    /**
     * 提交
     */
    const onFinish = async () => {
        let values = await form.validateFields();
        if(props.type === "edit" ){
            values.id = workspaceId;
            updateWorkspace(values).then(()=>{
                findList({},selectItem)
            });
        }else{
            createWorkspace(values).then(()=>{
                findList({},selectItem)
            });
            props.history.push("/workspacePage/create");
            menuSelected("create")
        }

        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
        {
            props.btn === 'btn'
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
                className='ws-edit-modal-form'
                form={form}
                preserve={false}
                layout={"vertical"}
            >
                <Form.Item
                    label="应用名称"
                    rules={[{ required: true, message: '添加目录名称!' }]}
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
