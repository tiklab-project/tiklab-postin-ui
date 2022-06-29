/*
 * @Description: 接口定义中后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 18:03:26
 */

import React, { useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import { PREPARAM_STORE } from '../store/preParamStore';
import { Form } from 'antd';
import CodeMirror from "../../../common/codeMirror";


const PreParam = (props) => {
    const { preParamStore }  = props;
    const {createPreScript, updatePreScript, findPreScript} = preParamStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();

    const apxMethodId =localStorage.getItem('apxMethodId') ;

    useEffect(()=>{
        findPreScript(apxMethodId).then((res)=>{
            if(!res ) return

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
            updatePreScript(param)
        }else{
            if(!text) return

            createPreScript(param).then((res)=>{
                if(res.code!==0) return

                findPreScript(apxMethodId).then(res=>{
                    if(!res ) return

                    rawDataRef.current=res
                })
            })
        }
    }


    return (
        <Form form={form} >
            <Form.Item name='scriptex'>
                <CodeMirror
                    mediaType={"application/javascript"}
                    blurFn={blurFn}
                    ediTextRef={ediTextRef}
                />
            </Form.Item>
        </Form>
    )
}

export default inject(PREPARAM_STORE)(observer(PreParam));
