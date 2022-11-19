
import React, { useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import {  Form } from 'antd';
import CodeMirror from "../../../common/codeMirror";

const PreScriptCase = (props) => {
    const { requestCaseStore }  = props;

    const { 
        createRequestCase,
        updateRequestCase,
        findRequestCase,
    } = requestCaseStore;
    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();

    const testCaseId = localStorage.getItem('testCaseId') ;

    useEffect(()=>{
        findRequestCase(testCaseId).then((res)=>{
            if(!res ) return

            rawDataRef.current=res
            form.setFieldsValue({
                preScript: res.preScript,
            })
        })
    },[testCaseId])


    const blurFn = () =>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()

        let param = {preScript:text}

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
        <div className={"api-script-box"}>
            <div className={"api-script-pre-header"}> </div>
            <Form form={form} >
                <Form.Item name='preScript'>
                    <CodeMirror
                        mediaType={"application/javascript"}
                        blurFn={blurFn}
                        ediTextRef={ediTextRef}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject( 'requestCaseStore')(observer(PreScriptCase));
