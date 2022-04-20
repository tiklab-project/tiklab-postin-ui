import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Modal, Button, Input } from 'antd';

const TestCaseEdit = (props) => {
    const { testCaseStore, apxMethodStore, testcaseId, setEdit } = props;
    const { findTestCase, createTestCase, updateTestCase } = testCaseStore;
    const { findApxMethod } = apxMethodStore;

    const [visible, setVisible] = useState(false);

    const apxMethodId = localStorage.getItem('apxMethodId');

    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
        if(props.type === "编辑"){
            findTestCase(testcaseId).then((res)=> {
                form.setFieldsValue({
                    name:res.name,
                    baseUrl: res.baseUrl
                })
            })
        }
        showApxMethodInfo();
    };

    
    // 展示接口信息
    const showApxMethodInfo = () => {
        
        findApxMethod(apxMethodId).then((res)=> {
            form.setFieldsValue({
                requestType:res.apix.requestType,
                path: res.apix.path,
            })
        })
    }

    const onFinish = () => {
        form.validateFields().then((values)=>{
            values.http ={id:apxMethodId}
            if(props.type === '编辑') {
                values.id = props.id;
                updateTestCase(values).then((res)=> {
                    if(res.code === 0){
                        setVisible(false);
                        setEdit(true)
                    }
                })
            }else{
                createTestCase(values)
            }  
        })
        setVisible(false);
    };

    const onFinishFailed = (errorInfo) => {console.log('Failed:', errorInfo)};
    
    const onCancel = () => {setVisible(false)};

    return(
        <>
        {
            props.btn === 'btn' ? <Button className="important-btn" onClick={showModal}>{props.type}</Button>
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
                <Form.Item
                    label="基础路径"
                    name="baseUrl"
                    rules={[{
                            required: true,
                            message: '添加接口路径!'
                        }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="请求方式"
                    name="requestType"
                    rules={[{
                            required: true,
                            message: '添加请求方式!'
                        }]}
                >
                    <Input disabled/>
                </Form.Item>
                
                <Form.Item
                    label="接口路径"
                    name="path"
                    rules={[{
                            required: true,
                            message: '添加接口路径!'
                        }]}
                >
                    <Input disabled/>
                </Form.Item>
            </Form>
        </Modal>
        </> 
    )
}

export default inject('apxMethodStore')(observer(TestCaseEdit));
