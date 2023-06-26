
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Input, Button, Form, Select} from 'antd';
import mockRawResponseStore from "../store/MockRawResponseStore";
const { TextArea } = Input;
const { Option } = Select;

/**
 * mock
 * 响应中 raw文本
 */
const RawResponseMock = (props) => {
    
    const { radioValue }  = props;

    const { 
        createRawResponseMock, 
        updateRawResponseMock, 
        findRawResponseMock, 
        mockRawResponseInfo
    } = mockRawResponseStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();


    const mockId = localStorage.getItem('mockId')
    useEffect(()=>{
        findRawResponseMock(mockId).then((res)=>{
            if(res){
                form.setFieldsValue({
                    result: res.result,
                    type:res.type
                })
            }
        })
    },[radioValue])

    // 保存数据
    const onFinish = (values) => {
        if(mockRawResponseInfo){
            updateRawResponseMock(values)
        }else{
            createRawResponseMock(values)
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
                name='result'
            >
                <TextArea autoSize={{ minRows: 4, maxRows: 10 }}  onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default observer(RawResponseMock);
