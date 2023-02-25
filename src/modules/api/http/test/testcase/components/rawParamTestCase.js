
import React, {useState, useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import {Button, Form, Select} from 'antd';
import {rawTypeDictionary} from "../../../../../common/dictionary/dictionary";
import CodeMirror from "../../../../../common/codeMirror";


const { Option } = Select;

const RawParamTestCase = (props) => {
    const { rawParamTestCaseStore }  = props;

    const {
        createRawParamTestCase,
        updateRawParamTestCase,
        findRawParamTestCase,
    } = rawParamTestCaseStore;

    //获取当前文本数据
    const ediTextRef = useRef(null);
    //获取当前的raw的数据
    const rawDataRef = useRef(null);
    //获取当前raw中的类型
    const typeRef =  useRef("application/json")
    //用于传入codemirror中的类型，直接通过typeRef.current无法传入
    const [typeValue, setTypeValue] = useState(typeRef.current);

    const [form] = Form.useForm();

    const testCaseId = localStorage.getItem('testCaseId') ;
    useEffect(()=>{

        findRawParamTestCase(testCaseId).then((res)=>{
            if(res){
                rawDataRef.current = res
                typeRef.current=res.type
                setTypeValue(typeRef.current)
                form.setFieldsValue({
                    raw: res.raw,
                    type:res.type
                })
            }
        })
    },[testCaseId])

    //失去焦点，获取更改raw中类型执行
    const save = ()=>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()
        //获取raw中type类型
        let type = typeRef.current

        let param = {
            raw:text,
            type:type
        }

        if(rawDataRef.current){
            updateRawParamTestCase(param)
        }else {
            if(!text) return

            createRawParamTestCase(param).then(res=>{
                findRawParamTestCase(testCaseId).then((res)=>{
                    if(!res) return
                    rawDataRef.current = res
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
            <Form form={form} initialValues={{"type":"application/json"}}>
                <div style={{border:"1px solid #f0f0f0"}}>
                    <Form.Item  name='raw'>
                        <CodeMirror
                            mediaType={typeValue}
                            ediTextRef={ediTextRef}
                            focusFn={focusFn}
                        />
                    </Form.Item>
                </div>
            </Form>

            <div className={`action-btn-box ${showBtn?"pi-show":"pi-hide"}`}>
                <Button onClick={()=>setShowBtn(false)} style={{marginRight:"10px"}}> 取消</Button>
                <Button onClick={save} className={"important-btn"}> 保存</Button>
            </div>

        </div>
    )
}

export default inject('rawParamTestCaseStore')(observer(RawParamTestCase));
