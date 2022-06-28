
import React, {useState, useEffect, useRef} from 'react';
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


    // const [type, setType] = useState("text/plain");
    const [mediaType, setMediaType] = useState("text/plain");
    const [rawData, setRawData] = useState();

    const [form] = Form.useForm();

    const  apxMethodId =localStorage.getItem('apxMethodId');
    useEffect(()=>{
        findRawParam(apxMethodId).then((res)=>{
            if(res){
                setRawData(res)
                setMediaType(res.type)
                form.setFieldsValue({
                    raw: res.raw,
                    type:res.type
                })
            }
        })
    },[])

    const showSelectItem = (data)=>{
        return data&&data.map(item=>{
            return  <Option value={item.value} key={item.key}>{item.value}</Option>
        })
    }

    const changeType = (type)=>{
        setMediaType(type)
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

                <Form.Item  name='raw'>
                    {
                        mediaType&&<CodeMirror
                            mediaType={mediaType}
                            rawData={rawData}
                            createFn={createRawParam}
                            updateFn={updateRawParam}
                        />
                    }
                </Form.Item>

            </Form>

        </div>

    )
}

export default inject('rawParamStore')(observer(RawParam));
