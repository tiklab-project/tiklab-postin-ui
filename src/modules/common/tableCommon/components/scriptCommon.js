
import React, { useState, useEffect } from 'react';
import { Input, Button, Form } from 'antd';

const { TextArea } = Input;

const ScriptCommon = (props) => {
    const { getInfo,setInfo }  = props;

    const [focus, setFocus] = useState(false);
    const [form] = Form.useForm();

    useEffect(()=>{
        setInfo().then(res=>{
            if(res){
                form.setFieldsValue({
                    scriptex: res.scriptex,
                })
            }
        })
    },[])

    const onFinish = (values) => {
        getInfo(values);
        setFocus(false);
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
        >
            <div className={` ${focus === true ? 'textArea-focus' : 'textArea-blur'}`}>
                <div className='mock-textarea'>
                    <Form.Item>
                        {/*<Button>格式化</Button>*/}
                        <Button  htmlType="submit" >保存</Button>
                    </Form.Item>
                </div>
            </div>
            <Form.Item name='scriptex'>
                <TextArea autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setFocus(true)}/>
            </Form.Item>

        </Form>
    )
}

export default ScriptCommon;