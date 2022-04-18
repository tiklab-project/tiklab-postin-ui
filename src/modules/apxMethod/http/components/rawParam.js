
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Input, Button, Form, Select} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const RawParam = (props) => {
    const { rawParamStore }  = props;

    const { 
        createRawParam, 
        updateRawParam, 
        findRawParam, 
        rawParamInfo 
    } = rawParamStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();

    const  apxMethodId =localStorage.getItem('apxMethodId');
    useEffect(()=>{
        findRawParam(apxMethodId).then((res)=>{
            if(res){
                form.setFieldsValue({
                    raw: res.raw,
                    type:res.type
                })
            }
        })
    },[])

    const onFinish = (values) => {
        if(rawParamInfo === null){
            createRawParam(values)
        }else{
            updateRawParam(values)
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
                        {/*<Button >格式化</Button>*/}
                        <Button  htmlType="submit" >保存</Button> 
                    </Form.Item>
                </div>
            </div>
            <Form.Item
                name='raw'
            >
                <TextArea  autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setFocus(true)}/>
            </Form.Item>
        </Form>
    )
}

export default inject('rawParamStore')(observer(RawParam));
