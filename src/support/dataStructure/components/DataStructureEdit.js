
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Input} from 'antd';
import IconBtn from "../../../common/iconBtn/IconBtn";
import IconCommon from "../../../common/IconCommon";
import Radio from "antd/es/radio/radio";

import dataStructureStore from "../store/DataStructureStore";
/**
 * @description：
 * @date: 2021-07-29 13:35
 */
const DataStructureEdit = (props) => {
    const {  dataStructureId } = props;
    const {
        findDataStructure,
        createDataStructure,
        updateDataStructure,
        findDataStructureList
    } = dataStructureStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    let workspaceId = localStorage.getItem("workspaceId")

    // 弹框展示
    const showModal = async () => {

        if(props.type === "edit"){
            let res = await findDataStructure(dataStructureId)

            form.setFieldsValue({
                coding: res.coding,
                name:res.name,
                dataType:res.dataType
            })
        }

        setVisible(true);
    };

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields()

        if(props.type === "add" ){
            values.workspace={id:workspaceId}
            values.dataType="json"
            createDataStructure(values).then(()=>{
                findDataStructureList({workspaceId:workspaceId})
            });
        }else{
            values.id=dataStructureId;
            updateDataStructure(values).then(()=>{
                findDataStructureList({workspaceId:workspaceId})
            });
        }

        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };


    return (
        <>
            {
                props.type === "add"
                    ? <IconBtn
                        className="important-btn"
                        onClick={showModal}
                        name={"添加模型"}
                    />
                    :  <IconCommon
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
                centered
            >
                <Form
                    form={form}
                    preserve={false}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true }]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    label="类型"*/}
                    {/*    rules={[{ required: true}]}*/}
                    {/*    name="dataType"*/}
                    {/*>*/}
                    {/*    <Radio.Group >*/}
                    {/*        <Radio value={"json" }>json</Radio>*/}

                    {/*    </Radio.Group>*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </>
    );
};

export default observer(DataStructureEdit);
