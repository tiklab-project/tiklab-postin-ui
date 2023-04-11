import React, { Fragment, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Form, Input, Select, Radio, Button} from 'antd';

const {Option} = Select

const httpCodes = [200,201,403,404,410,422,500,502,503,504]

/**
 * 定义
 * http
 * 响应中Tab添加
 */
const ResponseTabEdit =(props)=>{
    const { apiResponseStore,setActiveKey ,apxMethodId,apiResponseId} = props;
    const {findApiResponseList, createApiResponse,findApiResponse, updateApiResponse} = apiResponseStore;

    const [visible, setVisible] = useState(false);
    const [allData, setAllData] = useState();
    const [form] = Form.useForm();

    /**
     * 弹框展示
     */
    const showModal = async () => {
        if(props.type==="edit"){
            let res = await findApiResponse(apiResponseId)
            setAllData(res)
            form.setFieldsValue({...res})
        }

        setVisible(true)
    }

    /**
     * 收起弹框
     */
    const hideModal = () => setVisible(false)

    /**
     * 弹框提交
     */
    const onFinish = async () => {
        let values = await form.validateFields();
        values.httpId =  apxMethodId

        if(props.type==="edit"){
            values.id=allData.id;

            await updateApiResponse(values)
            await findApiResponseList({httpId:apxMethodId})
        }else {
            if(values.dataType==="json"){
                let jsonSchema =  {"type": "object","properties": {} }
                values.jsonText=JSON.stringify(jsonSchema)
            }

            let res = await createApiResponse(values)
            setActiveKey(res.data)
            await findApiResponseList({httpId:apxMethodId})
        }



        setVisible(false)
    };

    /**
     * 展示组件
     */
    const showView = () =>{
        if(props.type==="edit"){
            return <span onClick={showModal}>编辑</span>
        }else {
            return <Button
                style={{border: "none", width: "179px",height: "40px"}}
                onClick={showModal}
            >
                添加
            </Button>
        }

    }

    return(
        <>
            {showView()}
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