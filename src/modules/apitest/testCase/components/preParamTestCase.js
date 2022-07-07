
import React, { useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import { PREPARAM_TESTCASE_STORE } from '../store/preParamTestCaseStore';
import {  Form } from 'antd';
import CodeMirror from "../../../common/codeMirror";

const PreParamTestCase = (props) => {
    const { preParamTestCaseStore }  = props;

    const { 
        createPreParamTestCase, 
        updatePreParamTestCase, 
        findPreParamTestCase,
    } = preParamTestCaseStore;
    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();

    const testCaseId = localStorage.getItem('testCaseId') ;

    useEffect(()=>{
        findPreParamTestCase(testCaseId).then((res)=>{
            if(!res ) return

            rawDataRef.current=res
            form.setFieldsValue({
                scriptex: res.scriptex,
            })
        })
    },[testCaseId])


    const blurFn = () =>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()

        let param = {scriptex:text}

        if(rawDataRef.current){
            updatePreParamTestCase(param)
        }else{
            if(!text) return

            createPreParamTestCase(param).then((res)=>{
                if(res.code!==0) return

                findPreParamTestCase(testCaseId).then(res=>{
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

export default inject(PREPARAM_TESTCASE_STORE)(observer(PreParamTestCase));
