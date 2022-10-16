
import React, {useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import { Form} from 'antd';
import CodeMirror from "../../../common/codeMirror";



const RawResponse = (props) => {
    const { rawResponseStore, radioValue }  = props;

    const { 
        createRawResponse, 
        updateRawResponse, 
        findRawResponse, 
        rawResponseInfo 
    } = rawResponseStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();


    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findRawResponse(apxMethodId).then((res)=>{
            if(!res) return

            rawDataRef.current=res
            form.setFieldsValue({
                raw: res.raw,
                type:res.type
            })
        })
    },[apxMethodId])


    const blurFn = () =>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()

        let param = {
            raw:text,
            type:"application/json"
        }

        if(rawDataRef.current){
            updateRawResponse(param)
        }else{
            if(!text) return

            createRawResponse(param).then((res)=>{
                if(res.code!==0) return

                findRawResponse(apxMethodId).then(res=>{
                    if(!res ) return

                    rawDataRef.current=res
                })
            })
        }
    }


    return (
        <Form form={form}>
            <Form.Item name='raw'>
                <CodeMirror
                    mediaType={"application/json"}
                    blurFn={blurFn}
                    ediTextRef={ediTextRef}
                />
            </Form.Item>
            
        </Form>
    )
}

export default inject('rawResponseStore')(observer(RawResponse));
