/*
 * @Description: 接口定义 后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:42:56
 */

import React, { useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import { AFTERPARAM_STORE } from '../store/apiRequestStore';
import { Form } from 'antd';
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

    const blurFn = () =>{
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

export default inject("apiRequestStore")(observer(AfterScript));
