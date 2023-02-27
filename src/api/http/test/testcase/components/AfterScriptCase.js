
import React, {useEffect, useRef, useState} from 'react';
import { observer, inject } from 'mobx-react';
import {Button, Form} from 'antd';
import CodeMirror from "../../../../../common/CodeMirror";

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

    const save = () =>{
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

        setShowBtn(false)
    }

    const [showBtn, setShowBtn] = useState(false);

    const focusFn = () =>{
        setShowBtn(true)
    }


    return (
        <div className={"api-script-box"}>
            <div className={"api-script-pre-header"}> </div>
            <Form form={form} >
                <Form.Item name='afterScript' >
                    <CodeMirror
                        mediaType={"application/javascript"}
                        ediTextRef={ediTextRef}
                        focusFn={focusFn}
                    />
                </Form.Item>
            </Form>
            <div className={`action-btn-box ${showBtn?"pi-show":"pi-hide"}`}>
                <Button onClick={()=>setShowBtn(false)} style={{marginRight:"10px"}}> 取消</Button>
                <Button onClick={save} className={"important-btn"}> 保存</Button>
            </div>
        </div>
    )
}

export default inject('requestCaseStore')(observer(AfterScriptCase));
