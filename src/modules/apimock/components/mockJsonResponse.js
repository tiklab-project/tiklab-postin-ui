
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Input, Button, Form } from 'antd';
const { TextArea } = Input;

const MockJsonResponse = (props) => {
    const { mockJsonResponseStore }  = props;

    const { 
        createJsonResponseMock, 
        updateJsonResponseMock, 
        findJsonResponseMock, 
        mockJsonResponseInfo
    } = mockJsonResponseStore;

    const [focus, setFocus] = useState(false);
    const [result,setResult] = useState('');
    
    const [form] = Form.useForm();

    const mockId = localStorage.getItem('mockId')
    useEffect(()=>{
        findJsonResponseMock(mockId).then((res)=>{
            if(res){
                setResult(res.result)
                form.setFieldsValue({
                    result: res.result,
                })
            }
        })
    },[])

    const onFinish = (values) => {
        if(mockJsonResponseInfo){
            updateJsonResponseMock(values)
        }else{
            createJsonResponseMock(values)
        }

        setFocus(false)
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
        >
            <div className={` ${focus === true ? 'textArea-focus' : 'textArea-blur'}`}>
                <div className='mock-textarea'>
                    <Form.Item>
                        <Button>格式化</Button>
                        <Button  htmlType="submit" >保存</Button> 
                    </Form.Item>
                </div>
            </div>
            <Form.Item
                name='result'
            >
                <TextArea autoSize={{ minRows: 4, maxRows: 10}}   onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default inject('mockJsonResponseStore')(observer(MockJsonResponse));
