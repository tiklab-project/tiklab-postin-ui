/**
 * @description：
 * @date: 2021-07-23 11:19
 */
import React, { useEffect } from 'react';
import { Input, Form } from 'antd';
const { TextArea } = Input;

const PreParamVersion = (props) => {
    const { preParam }  = props;

    const [form] = Form.useForm();

    useEffect(()=>{
        if(preParam && preParam.length!==0){
            form.setFieldsValue({
                scriptex:preParam[0].scriptex ,
            })
        }
    },[preParam])

    return (
        <Form form={form}>
            <Form.Item name='scriptex'>
                <TextArea autoSize={{minRows: 4, maxRows: 10 }} />
            </Form.Item>
        </Form>
    )
}

export default PreParamVersion;
