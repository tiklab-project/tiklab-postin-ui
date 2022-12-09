import React, { Fragment, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Form, Input, Select, Radio} from 'antd';

const {Option} = Select

const httpCodes = [200,201,403,404,410,422,500,502,503,504]

// 添加
const ResponseTabEdit =(props)=>{
    const { apiResponseStore,setActiveKey ,apxMethodId} = props;
    const {findApiResponseList, createApiResponse } = apiResponseStore;

    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();

    // 弹框展示
    const showModal = () => setVisible(true)

    // 收起弹框
    const hideModal = () => setVisible(false)

    // 弹框提交
    const onFinish = async () => {

        let values = await form.validateFields()
        values.httpId =  apxMethodId

        if(values.dataType==="json"){
           let jsonSchema =  {"type": "object","properties": {} }
            values.jsonText=JSON.stringify(jsonSchema)
        }

        let res = await createApiResponse(values)
        setActiveKey(res.data)
        await findApiResponseList({httpId:apxMethodId})

        setVisible(false)
    };

    return(
        <>
            <a onClick={showModal}>添加</a>
            <Modal
                title="添加"
                visible={visible}
                onCancel={hideModal}
                destroyOnClose={true}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form form={form}   layout={"vertical"} >
                    <Form.Item
                        label="HTTP 状态码"
                        name="httpCode"
                        rules={[{ required: true, message: '添加HTTP 状态码!' }]}
                    >
                        <Select showSearch>
                            {
                                httpCodes.map(item=>{
                                    return <Option value={item} key={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="名称 "
                        name="name"
                        rules={[{ required: true, message: '添加名称!' }]}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        label="数据类型"
                        name="dataType"
                        rules={[{ required: true, message: '添加数据类型!' }]}
                    >
                        <Radio.Group >
                            <Radio value={"json"}>json</Radio>
                            <Radio value={"raw"}>raw</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )

}

export default inject('apiResponseStore')(observer(ResponseTabEdit));
