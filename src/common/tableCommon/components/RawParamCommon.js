import React, {useState, useRef} from 'react';
import {Form, Select} from 'antd';
import {rawTypeDictionary} from "../../dictionary/dictionary";
import CodeMirror from "../../CodeMirror";
import beautify from "js-beautify";
import IconCommon from "../../IconCommon";

const { Option } = Select;

/**
 * 请求体中raw
 */
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

    /**
     * 失去焦点，获取更改raw中类型执行
     */
    const blurFn = ()=>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()
        //获取raw中type类型
        let type = typeRef.current

        let param = {
            raw:text,
            type:type
        }
        //本地获取值
        updateFn(param)
    }

    //渲染raw中的类型
    const showSelectItem = (data)=>{
        let arr = Object.keys(data);

        return arr&&arr.map(item=>{
            let obj = data[item]
            return  <Option value={obj.mediaType} key={obj.mediaType}>{obj.mediaType}</Option>
        })
    }

    let beautifyCode =async (form) => {
        let text = ediTextRef.current.editor.getValue()

        let beautifyCode = beautify(text, {
            indent_size: 2,//缩进两个空格
            space_in_empty_paren: true,
        })

        let value = form.getFieldsValue()
        form.setFieldsValue({
            raw: beautifyCode,
            type:value.type
        })
    };

    return (
        <div className={"raw-box"}>
            <Form form={form} initialValues={{"type":"application/json"}}>

                <div className='raw-box-header'>
                    <div className={"raw-type"}>
                        <div onClick={()=>beautifyCode(form)} className={"raw-beautify"}>
                            <IconCommon
                                icon={"meihua"}
                                style={{width:"13px",height:"13px"}}
                            />
                            美化
                        </div>
                        {
                            props.use==="quick"
                                ?<Form.Item name='type' >
                                    <Select
                                        style={{ width: 180}}
                                        onChange={changeType}
                                        // bordered={false}
                                        suffixIcon={null}
                                    >
                                        {
                                            showSelectItem(rawTypeDictionary)
                                        }
                                    </Select>
                                </Form.Item>
                                :null
                        }
                    </div>
                </div>
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


