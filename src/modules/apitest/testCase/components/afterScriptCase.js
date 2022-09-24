
import React, { useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import { Form } from 'antd';
import CodeMirror from "../../../common/codeMirror";

const AfterScriptCase = (props) => {
    const { requestCaseStore }  = props;

    const { 
        createRequestCase, 
        updateRequestCase, 
        findRequestCase,
    } = requestCaseStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();

    const testCaseId =localStorage.getItem('testCaseId');

    useEffect(()=>{
        findRequestCase(testCaseId).then((res)=>{
            if(!res) return

            rawDataRef.current=res
            form.setFieldsValue({
                afterScript: res.afterScript,
            })
        })
    },[testCaseId])

    const blurFn = () =>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()

        let param = {afterScript:text}

        if(rawDataRef.current){
            updateRequestCase(param)
        }else{
            if(!text) return

            createRequestCase(param).then((res)=>{
                if(res.code!==0) return

                findRequestCase(testCaseId).then(res=>{
                    if(!res ) return

                    rawDataRef.current=res
                })
            })
        }
    }

    return (
        <Form form={form} >

            <Form.Item name='afterScript' >
                <CodeMirror
                    mediaType={"application/javascript"}
                    blurFn={blurFn}
                    ediTextRef={ediTextRef}
                />
            </Form.Item>
        </Form>
    )
}

export default inject('requestCaseStore')(observer(AfterScriptCase));
