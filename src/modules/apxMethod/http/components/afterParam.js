/*
 * @Description: 接口定义 后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:42:56
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { AFTERPARAM_STORE } from '../store/afterParamStore';
import { Input, Button, Form } from 'antd';

const { TextArea } = Input;

const AfterScript = (props) => {
    const {afterParamStore }  = props;
    const {createAfterScript, updateAfterScript, findAfterScript, afterScriptInfo} = afterParamStore;

    const [focus, setFocus] = useState(false);
    const [form] = Form.useForm();

    const apxMethodId =localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findAfterScript(apxMethodId).then((res)=>{
            form.setFieldsValue({
                scriptex: res.scriptex,
            })
        })
    },[apxMethodId])

    const onFinish = (values) => {
        if(afterScriptInfo){
            updateAfterScript(values)
        }else{
            createAfterScript(values)
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
                <TextArea autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setFocus(true)}/>
            </Form.Item>
        </Form>
    )
}

export default inject(AFTERPARAM_STORE)(observer(AfterScript));
