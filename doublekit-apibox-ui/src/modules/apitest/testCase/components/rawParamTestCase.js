
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Input, Button, Form, Select} from 'antd';
import {rawTypeDictionary} from "../../../common/dictionary/dictionary";

const { TextArea } = Input;
const { Option } = Select;

const RawParamTestCase = (props) => {
    const { rawParamTestCaseStore,radioValue }  = props;

    const {
        createRawParamTestCase,
        updateRawParamTestCase,
        findRawParamTestCase,
        rawParamTestCaseInfo
    } = rawParamTestCaseStore;

    const [focus, setFocus] = useState(false);

    const [form] = Form.useForm();

    const id = localStorage.getItem('testCaseId') ;

    useEffect(()=>{
        findRawParamTestCase(id).then((res)=>{
            if(res){
                form.setFieldsValue({
                    raw: res.raw,
                    type:res.type
                })
            }
        })
    },[radioValue])

    const onFinish = (values) => {
        if(rawParamTestCaseInfo.raw){
            updateRawParamTestCase(values)

        }else{
            createRawParamTestCase(values)
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
                        {/*<Button>格式化</Button>*/}
                        <Button  htmlType="submit" >保存</Button>
                    </Form.Item>
                </div>
            </div>
            <Form.Item
                name='raw'
            >
                <TextArea  autoSize={{minRows: 4, maxRows: 10 }}  onFocus={()=>setFocus(true)}/>
            </Form.Item>

        </Form>
    )
}

export default inject('rawParamTestCaseStore')(observer(RawParamTestCase));
