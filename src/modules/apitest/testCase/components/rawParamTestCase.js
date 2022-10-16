
import React, {useState, useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Select} from 'antd';
import {rawTypeDictionary} from "../../../common/dictionary/dictionary";
import CodeMirror from "../../../common/codeMirror";


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
    const typeRef =  useRef("text/plain")
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

    const showSelectItem = (data)=>{
        return data&&data.map(item=>{
            return  <Option value={item.value} key={item.key}>{item.value}</Option>
        })
    }

    //更改raw中的类型
    const changeType = (type)=>{
        typeRef.current=type
        setTypeValue(typeRef.current)
        blurFn()
    }

    //失去焦点，获取更改raw中类型执行
    const blurFn = ()=>{
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
    }


    return (
        <div className={"raw-box"}>
            <Form form={form} initialValues={{"type":"text/plain"}}>
                {/*<div className='raw-box-header'>*/}
                {/*    <Form.Item name='type'>*/}
                {/*        <Select*/}
                {/*            style={{ width: 180 ,color:"#0095ff"}}*/}
                {/*            onChange={changeType}*/}
                {/*            bordered={false}*/}
                {/*            suffixIcon={null}*/}
                {/*        >*/}
                {/*            {*/}
                {/*                showSelectItem(rawTypeDictionary)*/}
                {/*            }*/}
                {/*        </Select>*/}
                {/*    </Form.Item>*/}
                {/*</div>*/}

                <Form.Item  name='raw'>
                    <CodeMirror
                        mediaType={typeValue}
                        blurFn={blurFn}
                        ediTextRef={ediTextRef}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject('rawParamTestCaseStore')(observer(RawParamTestCase));
