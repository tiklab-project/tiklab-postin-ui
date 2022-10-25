/**
 * @description：
 * @date: 2021-07-29 13:35
 */
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';
const {Option} = Select;
// 添加与编辑空间
const DataStructureEdit = (props) => {
    const { dataStructureStore, dataStructureId } = props;
    const {
        findDataStructure,
        createDataStructure,
        updateDataStructure
    } = dataStructureStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.name === "编辑"){
            findDataStructure(dataStructureId).then((res)=>{
                form.setFieldsValue({
                    coding: res.coding,
                    name:res.name,
                    dataType:res.dataType
                })
            })
        }
    };

    // 提交
    const onFinish = () => {
        form.validateFields().then((values)=>{
            if(props.name === "添加数据结构" ){
                createDataStructure(values);
            }else{
                values.id=dataStructureId;
                updateDataStructure(values);
            }
        })
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.name === "添加数据结构" ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                    : <a onClick={showModal}>{props.name}</a>
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
                    form={form}
                    preserve={false}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="编码"
                        rules={[{ required: true, }]}
                        name="coding"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="名称"
                        rules={[{ required: true }]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        rules={[{ required: true}]}
                        name="dataType"
                    >
                        <Select>
                            <Option value="enum" >enum</Option>
                            <Option value="json" >json</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('dataStructureStore')(observer(DataStructureEdit));
