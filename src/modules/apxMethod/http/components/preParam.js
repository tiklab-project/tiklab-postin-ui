/*
 * @Description: 接口定义中后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 18:03:26
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx'
import { PREPARAM_STORE } from '../store/preParamStore';
import { Input, Button, Form } from 'antd';
const { TextArea } = Input;

const PreParam = (props) => {
    const { preParamStore }  = props;
    const {createPreScript, updatePreScript, findPreScript, preScriptInfo} = preParamStore;

    const [focus, setFocus] = useState(false);
    const [form] = Form.useForm();

    const apxMethodId =localStorage.getItem('apxMethodId') ;

    useEffect(()=>{
        findPreScript(apxMethodId).then((res)=>{
            form.setFieldsValue({
                scriptex: res.scriptex,
            })
        })
    },[])

    //提交数据
    const onFinish = (values) => {
        if(preScriptInfo){
            updatePreScript(values)
        }else{
            createPreScript(values)
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

export default inject(PREPARAM_STORE)(observer(PreParam));
