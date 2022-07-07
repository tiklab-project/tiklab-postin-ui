
import React, { useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import { Form } from 'antd';
import CodeMirror from "../../../common/codeMirror";

const AfterScriptTestCase = (props) => {
    const { afterScriptTestCaseStore }  = props;

    const { 
        createAfterScriptTestCase, 
        updateAfterScriptTestCase, 
        findAfterScriptTestCase,
    } = afterScriptTestCaseStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();

    const testCaseId =localStorage.getItem('testCaseId');

    useEffect(()=>{
        findAfterScriptTestCase(testCaseId).then((res)=>{
            if(!res) return

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
            updateAfterScriptTestCase(param)
        }else{
            if(!text) return

            createAfterScriptTestCase(param).then((res)=>{
                if(res.code!==0) return

                findAfterScriptTestCase(testCaseId).then(res=>{
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

export default inject('afterScriptTestCaseStore')(observer(AfterScriptTestCase));
