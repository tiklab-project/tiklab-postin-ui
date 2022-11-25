/*
 * @Description: 接口定义 后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:42:56
 */

import React, {useEffect, useRef, useState} from 'react';
import { observer, inject } from 'mobx-react';
import { AFTERPARAM_STORE } from '../store/apiRequestStore';
import {Button, Form} from 'antd';
import CodeMirror from "../../../common/codeMirror";


const AfterScript = (props) => {
    const {apiRequestStore }  = props;
    const {createApiRequest, updateApiRequest, findApiRequest} = apiRequestStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();

    const apxMethodId =localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findApiRequest(apxMethodId).then((res)=>{
            if(!res) return

            rawDataRef.current=res
            form.setFieldsValue({
                afterScript: res.afterScript,
            })
        })
    },[apxMethodId])

    const save = () =>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()

        let param = {afterScript:text}

        if(rawDataRef.current){
            updateApiRequest(param)
        }else{
            if(!text) return

            createApiRequest(param).then((res)=>{
                if(res.code!==0) return

                findApiRequest(apxMethodId).then(res=>{
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
                <div style={{border:"1px solid #f0f0f0"}}>
                    <Form.Item name='afterScript'>
                        <CodeMirror
                            mediaType={"application/javascript"}
                            ediTextRef={ediTextRef}
                            focusFn={focusFn}
                        />
                    </Form.Item>
                </div>
                <div className={`action-btn-box ${showBtn?"pi-show":"pi-hide"}`}>
                    <Button onClick={()=>setShowBtn(false)} style={{marginRight:"10px"}}> 取消</Button>
                    <Button onClick={save} className={"important-btn"}> 保存</Button>
                </div>
            </Form>
        </div>
    )
}

export default inject("apiRequestStore")(observer(AfterScript));
