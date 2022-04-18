
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Input, Button, Form } from 'antd';
const { TextArea } = Input;

const AfterScriptTestCase = (props) => {
    const { afterScriptTestCaseStore }  = props;

    const { 
        createAfterScriptTestCase, 
        updateAfterScriptTestCase, 
        findAfterScriptTestCase, 
        afterScriptTestCaseInfo,
        getAfterScriptCaseInfo
    } = afterScriptTestCaseStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();

    const id = localStorage.getItem('testCaseId') ;

    useEffect(()=>{
        findAfterScriptTestCase(id).then((res)=>{
            if(res){
                form.setFieldsValue({
                    scriptex: res.scriptex,
                })
            }
        })
    },[])

    const onFinish = (values) => {
        if(afterScriptTestCaseInfo){
            getAfterScriptCaseInfo(values)
            updateAfterScriptTestCase(values)
        }else{
            createAfterScriptTestCase(values)
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
                <TextArea  autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default inject('afterScriptTestCaseStore')(observer(AfterScriptTestCase));
