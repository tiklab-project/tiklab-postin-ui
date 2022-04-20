/**
 * @description：
 * @date: 2021-07-23 11:17
 */
import React, { useEffect } from 'react';
import { Input, Form } from 'antd';
const { TextArea } = Input;

const RawParamVersion = (props) => {
    const { rawParam }  = props;

    const [form] = Form.useForm();

    useEffect(()=>{
        if(rawParam && rawParam.length!==0){
            form.setFieldsValue({
                rawParam: rawParam[0].raw,
            })
        }
    },[rawParam])

    return (
        <Form form={form}>
            <Form.Item name='rawParam'>
                <TextArea autoSize={{minRows: 4, maxRows: 10 }} />
            </Form.Item>
        </Form>
    )
}

export default RawParamVersion;
