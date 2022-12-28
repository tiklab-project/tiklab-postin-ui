import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Modal, Button, Input } from 'antd';
import IconBtn from "../../../common/iconBtn/IconBtn";
import IconCommon from "../../../common/iconCommon";

const TestCaseEdit = (props) => {
    const { testCaseStore, testcaseId } = props;
    const { findTestCase, createTestCase, updateTestCase,findTestCaseList } = testCaseStore;

    const [visible, setVisible] = useState(false);

    const apxMethodId = localStorage.getItem('apxMethodId');

    const [form] = Form.useForm();

    const showModal = async () => {
        if(props.type === "edit") {
            let res = await findTestCase(testcaseId)
            form.setFieldsValue({
                name: res.name,
            })
        }

        setVisible(true);
    };

    const onFinish = async () => {
        let values = await form.validateFields()
        values.http ={id:apxMethodId}
        if(props.type === 'edit') {
            values.id = testcaseId;
            updateTestCase(values).then(()=>findList())
        }else{
            createTestCase(values).then(()=>findList())
        }

        setVisible(false);
    };

    const findList = ()=>{
        findTestCaseList(apxMethodId)
    }

    const onCancel = () => {setVisible(false)};

    return(
        <>
        {
            props.btn === 'btn'
                ? <IconBtn
                    className="important-btn"
                    onClick={showModal}
                    name={"添加用例"}
                />
                : <IconCommon
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
        >
            <Form
                preserve={false}
                className='testCase-edit-form'
                form={form}
                layout={"vertical"}
            >
                <Form.Item
                    label="用例名称"
                    name="name"
                    rules={[{ required: true, message: '添加用例名称!'}]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
        </> 
    )
}

export default inject('apxMethodStore')(observer(TestCaseEdit));
