import React, { useState, useEffect } from 'react';
import {Input, Button, Form, Select} from 'antd';
import {rawTypeDictionary} from "../../dictionary/dictionary";

const { TextArea } = Input;
const { Option } = Select;

const RawParamCommon = (props) => {
    const { getInfo, form}  = props;

    const [focus, setFocus] = useState(false);



    const onFinish = (values) => {
        getInfo(values);
        setFocus(false);
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
            <Form.Item  name='raw'>
                <TextArea
                    autoSize={{minRows: 4, maxRows: 10 }}
                    onFocus={()=>setFocus(true)}
                />
            </Form.Item>

        </Form>
    )
}

export default RawParamCommon;


