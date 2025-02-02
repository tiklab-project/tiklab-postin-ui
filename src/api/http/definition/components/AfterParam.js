import React, {useEffect, useRef, useState} from 'react';
import { observer, inject } from 'mobx-react';
import {Button, Form} from 'antd';
import CodeMirror from "../../../../common/CodeMirror";
import apiRequestStore from "../../../api/store/ApiRequestStore";
/**
 * @Description: 接口定义 后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:42:56
 */
const AfterScript = (props) => {
    const {createApiRequest, updateApiRequest, findApiRequest} = apiRequestStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();

    const apiId =localStorage.getItem('apiId');

    useEffect(()=>{
        findApiRequest(apiId).then((res)=>{
            if(!res) return

            rawDataRef.current=res
            form.setFieldsValue({
                afterScript: res.afterScript,
            })
        })
    },[apiId])

    /**
     * 保存脚本文本数据
     */
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

                findApiRequest(apiId).then(res=>{
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
                <div className={` ${showBtn?"pi-show":"pi-hide"}`}>
                    <Button onClick={()=>setShowBtn(false)} style={{marginRight:"10px"}}> 取消</Button>
                    <Button onClick={save} className={"important-btn"} type="primary"> 保存</Button>
                </div>
            </Form>
        </div>
    )
}

export default observer(AfterScript);
