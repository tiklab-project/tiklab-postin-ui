/*
 * @Description: 接口定义 后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:42:56
 */

import React, {useState, useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import { AFTERPARAM_STORE } from '../store/afterParamStore';
import { Input, Button, Form } from 'antd';
import CodeMirror from "../../../common/codeMirror";

const { TextArea } = Input;

const AfterScript = (props) => {
    const {afterParamStore }  = props;
    const {createAfterScript, updateAfterScript, findAfterScript, afterScriptInfo} = afterParamStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();

    const apxMethodId =localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findAfterScript(apxMethodId).then((res)=>{
            if(!res) return

            rawDataRef.current=res
            form.setFieldsValue({
                scriptex: res.scriptex,
            })
        })
    },[apxMethodId])

    const blurFn = () =>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()

        let param = {scriptex:text}

        if(rawDataRef.current){
            updateAfterScript(param)
        }else{
            if(!text) return

            createAfterScript(param).then((res)=>{
                if(res.code!==0) return

                findAfterScript(apxMethodId).then(res=>{
                    if(!res ) return

                    rawDataRef.current=res
                })
            })
        }
    }


    return (
        <Form form={form} >

            <Form.Item name='scriptex' >
                <CodeMirror
                    mediaType={"application/javascript"}
                    blurFn={blurFn}
                    ediTextRef={ediTextRef}
                />
            </Form.Item>
        </Form>
    )
}

export default inject(AFTERPARAM_STORE)(observer(AfterScript));
