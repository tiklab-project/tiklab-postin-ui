
import React, {useEffect, useRef, useState} from 'react';
import { observer } from 'mobx-react';
import {Button, Form} from 'antd';
import CodeMirror from "../../../../common/CodeMirror";
import rawResponseStore from "../store/RawResponseStore";
/**
 *定义
 * http
 * 响应中raw
 */
const RawResponse = (props) => {

    const { 
        createRawResponse, 
        updateRawResponse, 
        findRawResponse
    } = rawResponseStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();


    const apiId = localStorage.getItem('apiId');

    useEffect(()=>{
        findRawResponse(apiId).then((res)=>{
            if(!res) return

            rawDataRef.current=res
            form.setFieldsValue({
                raw: res.raw,
                type:res.type
            })
        })
    },[apiId])

    /**
     * 失去焦点，获取更改raw中类型执行
     */
    const save = () =>{
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

                findRawResponse(apiId).then(res=>{
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
        <div className={"raw-box"}>
            <Form form={form}>
                <div style={{border:"1px solid #f0f0f0"}}>
                    <Form.Item  name='raw'>
                        <CodeMirror
                            mediaType={"application/json"}
                            ediTextRef={ediTextRef}
                            focusFn={focusFn}
                        />
                    </Form.Item>
                </div>
                <div className={` ${showBtn?"pi-show":"pi-hide"}`}>
                    <Button onClick={()=>setShowBtn(false)} style={{marginRight:"10px"}}> 取消</Button>
                    <Button onClick={save} className={"important-btn"} type="primary"> 保存</Button>
                </div>

            </Form>
        </div>
    )
}

export default observer(RawResponse);
