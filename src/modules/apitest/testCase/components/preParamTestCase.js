
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx'
import { PREPARAM_TESTCASE_STORE } from '../store/preParamTestCaseStore';
import { Input, Button, Form } from 'antd';
const { TextArea } = Input;

const PreParamTestCase = (props) => {
    const { preParamTestCaseStore }  = props;

    const { 
        createPreParamTestCase, 
        updatePreParamTestCase, 
        findPreParamTestCase, 
        preParamTestCaseInfo ,
        getPreParamCaseInfo
    } = preParamTestCaseStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();

    const id = localStorage.getItem('testCaseId') ;

    useEffect(()=>{
        findPreParamTestCase(id).then((res)=>{
            if(res){
                form.setFieldsValue({
                    scriptex: res.scriptex,
                })
            }
        })
    },[])

    const onFinish = (values) => {
        if(preParamTestCaseInfo){
            getPreParamCaseInfo(values)
            updatePreParamTestCase(values)
        }else{
            createPreParamTestCase(values)
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
                name='scriptex'
            >
                <TextArea  autoSize={{minRows: 4, maxRows: 10 }}  onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default inject(PREPARAM_TESTCASE_STORE)(observer(PreParamTestCase));
