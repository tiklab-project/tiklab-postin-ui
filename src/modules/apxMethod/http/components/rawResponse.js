
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Input, Button, Form, Select} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const RawResponse = (props) => {
    const { rawResponseStore, radioValue }  = props;

    const { 
        createRawResponse, 
        updateRawResponse, 
        findRawResponse, 
        rawResponseInfo 
    } = rawResponseStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();


    const apxMethodId = localStorage.getItem('apxMethodId');
    useEffect(()=>{
        findRawResponse(apxMethodId).then((res)=>{
            if(res){
                form.setFieldsValue({
                    raw: res.raw,
                    type:res.type
                })
            }
        })
    },[radioValue])

    const onFinish = (values) => {
        if(rawResponseInfo?.raw === null){
            createRawResponse(values)
        }else{
            updateRawResponse(values)
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
                    <Form.Item name='type'>
                        <Select style={{ width: 100 }} >
                            <Option value="json">Json</Option>
                            <Option value="text">Text</Option>
                            {/*<Option value="html">html</Option>*/}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button>格式化</Button>
                        <Button  htmlType="submit" >保存</Button> 
                    </Form.Item>
                </div>
            </div>
            <Form.Item
                name='raw'
            >
                <TextArea autoSize={{ minRows: 4, maxRows: 10 }}  onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default inject('rawResponseStore')(observer(RawResponse));
