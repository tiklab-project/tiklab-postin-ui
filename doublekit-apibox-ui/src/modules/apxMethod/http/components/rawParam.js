
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Input, Button, Form, Select} from 'antd';
import {rawTypeDictionary} from "../../../common/dictionary/dictionary";

const { TextArea } = Input;
const { Option } = Select;

const RawParam = (props) => {
    const { rawParamStore }  = props;

    const { 
        createRawParam, 
        updateRawParam, 
        findRawParam, 
        rawParamInfo 
    } = rawParamStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();

    const  apxMethodId =localStorage.getItem('apxMethodId');
    useEffect(()=>{
        findRawParam(apxMethodId).then((res)=>{
            if(res){
                form.setFieldsValue({
                    raw: res.raw,
                    type:res.type
                })
            }
        })
    },[])

    const onFinish = (values) => {
        if(rawParamInfo === null){
            createRawParam(values)
        }else{
            updateRawParam(values)
        }
        setFocus(false)
    }

    const showSelectItem = (data)=>{
        return data&&data.map(item=>{
            return  <Option value={item.value} key={item.value}>{item.name}</Option>
        })
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
        >
            <div className={` ${focus === true ? 'textArea-focus' : 'textArea-blur'}`}>
                <div className='mock-textarea'>
                    <Form.Item name='type'>
                        <Select
                            style={{ width: 200 }}
                            defaultValue={"text/plain"}
                        >
                            {
                                showSelectItem(rawTypeDictionary)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        {/*<Button >格式化</Button>*/}
                        <Button  htmlType="submit" >保存</Button> 
                    </Form.Item>
                </div>
            </div>
            <Form.Item
                name='raw'
            >
                <TextArea  autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setFocus(true)}/>
            </Form.Item>
        </Form>
    )
}

export default inject('rawParamStore')(observer(RawParam));
