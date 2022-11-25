
import React, {useEffect, useRef, useState} from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Select} from 'antd';
import {rawTypeDictionary} from "../../../common/dictionary/dictionary";
import CodeMirror from "../../../common/codeMirror";

const { Option } = Select;

const RawParam = (props) => {
    const { rawParamStore }  = props;
    const { 
        createRawParam,
        updateRawParam,
        findRawParam,
    } = rawParamStore;

    //获取当前文本数据
    const ediTextRef = useRef(null);
    //获取当前的raw的数据
    const rawDataRef = useRef(null);
    //获取当前raw中的类型
    const typeRef =  useRef("text/plain")
    //用于传入codemirror中的类型，直接通过typeRef.current无法传入
    const [typeValue, setTypeValue] = useState(typeRef.current);

    const [form] = Form.useForm();

    const  apxMethodId =localStorage.getItem('apxMethodId');
    useEffect(()=>{

        findRawParam(apxMethodId).then((res)=>{
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
    },[apxMethodId])

    const showSelectItem = (data)=>{
        return data&&data.map(item=>{
            return  <Option value={item.value} key={item.key}>{item.value}</Option>
        })
    }

    //更改raw中的类型
    const changeType = (type)=>{
        typeRef.current=type
        setTypeValue(typeRef.current)
        save()
    }

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
            updateRawParam(param)
        }else {
            if(!text) return

            createRawParam(param).then(res=>{
                findRawParam(apxMethodId).then((res)=>{
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
            <Form form={form} initialValues={{"type":"text/plain"}}>
                <div className='raw-box-header'>
                    <Form.Item name='type'>
                        <Select
                            style={{ width: 180 ,color:"#0095ff"}}
                            onChange={changeType}
                            bordered={false}
                            suffixIcon={null}
                        >
                            {
                                showSelectItem(rawTypeDictionary)
                            }
                        </Select>
                    </Form.Item>
                </div>

                <div style={{border:"1px solid #f0f0f0"}}>
                    <Form.Item  name='raw'>
                        <CodeMirror
                            mediaType={typeValue}
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

export default inject('rawParamStore')(observer(RawParam));
