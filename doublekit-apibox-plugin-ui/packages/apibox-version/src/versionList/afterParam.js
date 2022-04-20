/**
 * @description：
 * @date: 2021-07-23 11:20
 */
import React, { useEffect } from 'react';
import { Input,Form } from 'antd';

const { TextArea } = Input;

const BackParamVersion = (props) => {
    const {afterParam}  = props;

    const [form] = Form.useForm();

    useEffect(()=>{
        if(afterParam && afterParam.length!==0){
            form.setFieldsValue({
                scriptex: afterParam[0].scriptex,
            })
        }
    },[afterParam])

    return (
        <Form form={form}>
            <Form.Item name='scriptex'>
                <TextArea autoSize={{minRows: 4, maxRows: 10 }}/>
            </Form.Item>
        </Form>
    )
}

export default BackParamVersion;
