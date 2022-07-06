import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Modal, Button, Input } from 'antd';

const TestCaseEdit = (props) => {
    const { testCaseStore, testcaseId } = props;
    const { findTestCase, createTestCase, updateTestCase,findTestCaseList } = testCaseStore;

    const [visible, setVisible] = useState(false);

    const apxMethodId = localStorage.getItem('apxMethodId');

    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
        if(props.type === "编辑"){
            findTestCase(testcaseId).then((res)=> {
                form.setFieldsValue({
                    name:res.name,
                })
            })
        }
    };

    const onFinish = async () => {
        let values = await form.validateFields()
        values.http ={id:apxMethodId}
        if(props.type === '编辑') {
            values.id = testcaseId;
            updateTestCase(values).then((res)=> {
                findList()
            })
        }else{
            values.requestBodyCase= {bodyType: "raw"}

            createTestCase(values).then(res=>{
                findList()
            })
        }

        setVisible(false);
    };

    const findList = ()=>{
        findTestCaseList(apxMethodId)
    }

    const onFinishFailed = (errorInfo) => {console.log('Failed:', errorInfo)};
    
    const onCancel = () => {setVisible(false)};

    return(
        <>
        {
            props.btn === 'btn'
                ? <Button className="important-btn" onClick={showModal}>{props.type}</Button>
                : <a style={{'cursor':'pointer'}} onClick={showModal}>{props.type}</a>
        }
        <Modal
            destroyOnClose={true}
            title={props.type}
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用例名称"
                    name="name"
                    rules={[{
                        required: true,
                        message: '添加用例名称!'
                    }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
        </> 
    )
}

export default inject('apxMethodStore')(observer(TestCaseEdit));
