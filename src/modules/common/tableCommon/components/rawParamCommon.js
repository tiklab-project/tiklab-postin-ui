import React, {useState, useEffect, useRef} from 'react';
import { Button, Form, Select} from 'antd';
import {rawTypeDictionary} from "../../dictionary/dictionary";
import CodeMirror from "../../codeMirror";

const { Option } = Select;

const RawParamCommon = (props) => {
    const { form,type,updateFn}  = props;

    //获取当前文本数据
    const ediTextRef = useRef(null);
    //获取当前raw中的类型
    const typeRef =  useRef(type?type:"application/json")
    //用于传入codemirror中的类型，直接通过typeRef.current无法传入
    const [typeValue, setTypeValue] = useState(type?type:"application/json");



    const changeType = (type)=>{
        typeRef.current=type;
        setTypeValue(type)
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
console.log(param)
        //本地获取值
        updateFn(param)
    }

    //渲染raw中的类型
    const showSelectItem = (data)=>{
        return data&&data.map(item=>{
            return  <Option value={item.value} key={item.value}>{item.name}</Option>
        })
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

export default RawParamCommon;


