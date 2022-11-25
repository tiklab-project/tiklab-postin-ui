/**
 * @description：
 * @date: 2021-07-29 13:35
 */
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';
import IconBtn from "../../../common/iconBtn/IconBtn";
const {Option} = Select;
// 添加与编辑空间
const DataStructureEdit = (props) => {
    const { dataStructureStore, dataStructureId } = props;
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
    const onFinish = () => {
        form.validateFields().then((values)=>{


            if(props.type === "add" ){
                values.workspace={id:workspaceId}
                createDataStructure(values).then(()=>{
                    findDataStructureList({workspaceId:workspaceId})
                });
            }else{
                values.id=dataStructureId;
                updateDataStructure(values).then(()=>{
                    findDataStructureList({workspaceId:workspaceId})
                });
            }
        })
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };



    return (
        <>
            {
                props.type === "add"
                    ? <IconBtn
                        className="important-btn"
                        icon={"xinzeng-copy"}
                        onClick={showModal}
                        name={"添加模型"}
                    />
                    :  <svg className="icon-s edit-icon" aria-hidden="true" onClick={showModal}>
                        <use xlinkHref= {`#icon-bianji11`} />
                    </svg>
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
