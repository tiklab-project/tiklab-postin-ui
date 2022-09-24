/*
 * @Description: 接口定义中后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 18:03:26
 */

import React, { useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import { Form } from 'antd';
import CodeMirror from "../../../common/codeMirror";


const PreParam = (props) => {
    const { apiRequestStore }  = props;
    const {createApiRequest, updateApiRequest, findApiRequest} = apiRequestStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();

    const apxMethodId =localStorage.getItem('apxMethodId') ;

    useEffect(()=>{
        findApiRequest(apxMethodId).then((res)=>{
            if(!res ) return

            rawDataRef.current=res
            form.setFieldsValue({
                preScript: res.preScript,
            })
        })
    },[apxMethodId])


    const blurFn = () =>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()

        let param = {preScript:text}

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
            <Form.Item name='preScript'>
                <CodeMirror
                    mediaType={"application/javascript"}
                    blurFn={blurFn}
                    ediTextRef={ediTextRef}
                    readOnly={false}
                />
            </Form.Item>
        </Form>
    )
}

export default inject("apiRequestStore")(observer(PreParam));
